﻿using System;
using System.Threading;
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
            
            var rabbitMqSettingsThresholds = new RabbitMqSubscriptionSettings
            {
                ConnectionString = settings.RabbitMqConnectionString,
                ExchangeName = settings.RabbitMqThresholdsExchange,
                QueueName = $"{settings.RabbitMqThresholdsExchange}.HeatMapJob",
                IsDurable = false,
                ReconnectionsCountToAlarm = -1,
                ReconnectionDelay = TimeSpan.FromSeconds(5)                
            };


            var indexInfoCache = new IndexInformationRepository(
                new MyNoSqlServerClient<IndexInformationTableEntity>(settings.CacheUrl, "IndexInfo"));
            
            var historyRepo = new BidAskHistoryRepository(
                new MyNoSqlServerClient<BidAskHistoryTableEntity>(settings.CacheUrl, "bidaskhistory"));
            
            var table = new MyNoSqlServerClient<BidAskMySqlTableEntity>(settings.CacheUrl, "bidask");
            var bidAskRepository = new BidAskRepository(table);            
            
            var overshootIndicatorsDataTable = new MyNoSqlServerClient<OvershootIndicatorNoSqlEntity>(settings.CacheUrl, "overshoots");
            var overshootIndicatorsRepository = new OvershootIndicatorsDataRepository(overshootIndicatorsDataTable);
            
            IndexInfoFeed.BidAskHistoryWriter.Inject(historyRepo);
            IndexInfoFeed.BidAskWriter.Inject(bidAskRepository);
            IndexInfoFeed.RabbitMqConnector.Init(indexInfoCache, overshootIndicatorsRepository);
            IndexInfoFeed.RabbitMqConnector.RunIt(rabbitMqSettings, rabbitMqSettingsThresholds);

            Console.WriteLine("Running...");
            while (true)
                Thread.Sleep(5000);
            
        }
    }
}