using System;
using HeatMap.Services;
using Lykke.RabbitMqBroker.Subscriber;
using MyNoSqlServerClient;

namespace HeatMap.DataJob
{
    class Program
    {
        static void Main(string[] args)
        {

            var settings = SettingsModel.Create();
            
            var rabbitMqSettings = new RabbitMqSubscriptionSettings
            {
                ConnectionString = settings.RabbitMqConnectionString,
                ExchangeName = settings.RabbitMqExchange,
                QueueName = $"{settings.RabbitMqExchange}.HeatMapJob",
                IsDurable = false,
                ReconnectionsCountToAlarm = -1,
                ReconnectionDelay = TimeSpan.FromSeconds(5)                
            };

            var indexInfoCache = new IndexInformationRepository(
                new MyNoSqlServerClient<IndexInformationTableEntity>(settings.CacheUrl, "IndexInfo"));
            
            IndexInfoFeed.RabbitMqConnector.Init(indexInfoCache);
            IndexInfoFeed.RabbitMqConnector.RunIt(rabbitMqSettings);

            while (true)
            {
                Console.WriteLine("Running...");
                Console.ReadLine();
            }
        }
    }
}