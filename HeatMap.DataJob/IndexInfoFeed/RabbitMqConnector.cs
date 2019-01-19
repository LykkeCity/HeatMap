using System;
using System.Threading.Tasks;
using HeatMap.Domains;
using Lykke.Logs;
using Lykke.RabbitMqBroker;
using Lykke.RabbitMqBroker.Subscriber;
using Microsoft.Extensions.Logging.Console;

namespace HeatMap.DataJob.IndexInfoFeed
{
    public static class RabbitMqConnector
    {

        private static IIndexInformationRepository _informationRepository;

        public static void Init(IIndexInformationRepository informationRepository)
        {
            _informationRepository = informationRepository;
        }
        
        private static RabbitMqSubscriber<string> _connector;

        public static void RunIt(RabbitMqSubscriptionSettings settings)
        {

            var logFactory =  LogFactory.Create();
            logFactory.AddProvider( new ConsoleLoggerProvider((itm1, itm2) => true, true));
                
            
            _connector = new RabbitMqSubscriber<string>(logFactory, settings, new DefaultErrorHandlingStrategy(logFactory, settings))
                .SetMessageDeserializer(new DefaultStringDeserializer())
                .SetMessageReadStrategy(new MessageReadWithTemporaryQueueStrategy())
                .CreateDefaultBinding()
                .Subscribe(HandleMessage)
                .Start();
        }

        private static async Task HandleMessage(string msg)
        {
            Console.WriteLine(msg);
            Console.WriteLine("----");
            var contract = Newtonsoft.Json.JsonConvert.DeserializeObject<IndexInformationContract>(msg);
            await _informationRepository.UpdateAsync(contract);
        }
    }
}