using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HeatMap.Domains;
using Lykke.Logs;
using Lykke.RabbitMqBroker;
using Lykke.RabbitMqBroker.Subscriber;
using Microsoft.Extensions.Logging.Console;

namespace HeatMap.DataJob.IndexInfoFeed
{
    public class BidAsk : IBidAsk
    {
        public string Id { get; set; }
        public DateTime DateTime { get; set; }
        public double Bid { get; set; }
        public double Ask { get; set; }
        public bool Up { get; set; }


        public static BidAsk Create(string id, double rate, DateTime dateTime)
        {
            return new BidAsk
            {
                Id = id,
                Ask = rate,
                Bid = rate,
                DateTime = dateTime
            };
        }
    }
    
    public static class RabbitMqConnector
    {

        private static IIndexInformationRepository _informationRepository;

        private static IOvershootIndicatorsDataRepository _overshootIndicatorsDataRepository;
        public static void Init(IIndexInformationRepository informationRepository, 
            IOvershootIndicatorsDataRepository overshootIndicatorsDataRepository)
        {
            _informationRepository = informationRepository;
            _overshootIndicatorsDataRepository = overshootIndicatorsDataRepository;
        }
        
        private static RabbitMqSubscriber<string> _connector;

        
        private static RabbitMqSubscriber<string> _thresholds;
        public static void RunIt(RabbitMqSubscriptionSettings settingsAssetsInfo,  RabbitMqSubscriptionSettings settingsThresholds)
        {

            var logFactory =  LogFactory.Create();
            logFactory.AddProvider( new ConsoleLoggerProvider((itm1, itm2) => true, true));
                
            
            
            _connector = new RabbitMqSubscriber<string>(logFactory, settingsAssetsInfo, new DefaultErrorHandlingStrategy(logFactory, settingsAssetsInfo))
                .SetMessageDeserializer(new DefaultStringDeserializer())
                .SetMessageReadStrategy(new MessageReadWithTemporaryQueueStrategy())
                .CreateDefaultBinding()
                .Subscribe(HandleMessage)
                .Start();
            
            _thresholds = new RabbitMqSubscriber<string>(logFactory, settingsThresholds, new DefaultErrorHandlingStrategy(logFactory, settingsThresholds))
                .SetMessageDeserializer(new DefaultStringDeserializer())
                .SetMessageReadStrategy(new MessageReadWithTemporaryQueueStrategy())
                .CreateDefaultBinding()
                .Subscribe(HandleThresholdsMessage)
                .Start();
            
        }



        private static async Task HandleMessage(string msg)
        {
            Console.WriteLine(msg);
            Console.WriteLine("----");
            var contract = Newtonsoft.Json.JsonConvert.DeserializeObject<IndexInformationContract>(msg);
            await _informationRepository.UpdateAsync(contract);

            var result = new List<IBidAsk>();
            var newBitAsk = BidAsk.Create(contract.AssetPair, contract.Bid, contract.Timestamp);
            
            result.Add(newBitAsk);
            result.AddRange(contract.AssetsInfo.Select(assetInfo => BidAsk.Create(assetInfo.AssetId, assetInfo.Price, contract.Timestamp)));


            var items = result.ToArray();
            await BidAskHistoryWriter.UpdateAsync(items);
            await BidAskWriter.UpdateAsync(items);

        }
        
        private static async Task HandleThresholdsMessage(string msg)
        {
            Console.WriteLine(msg);
            Console.WriteLine("----");
            var contract = Newtonsoft.Json.JsonConvert.DeserializeObject<OvershootIndicatorsRabbitMqContract>(msg);

            var data = contract.Indicators.GroupBy(itm => itm.AssetPair).ToDictionary(itm => itm.Key, itm => itm.Cast<IOvershootIndicatorData>());
            await _overshootIndicatorsDataRepository.UpdateAsync(data);

        }
    }
}