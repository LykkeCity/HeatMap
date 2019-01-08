using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HeatMap.Domains;
using MyNoSqlServerClient;

namespace HeatMap.Services
{
    public class BidAskMySqlTableEntity: MyNoSqlTableEntity, IBidAsk
    {
        public static string GeneratePartitionKey()
        {
            return "BidAsk";
        }
        
        public static string GenerateRowKey(string assetId)
        {
            return assetId;
        }

        public string Id => RowKey;
        public DateTime DateTime { get; set; }
    
        public double Bid { get; set; }
        public double Ask { get; set; }

        public static BidAskMySqlTableEntity Create(IBidAsk bidAsk)
        {
            return new BidAskMySqlTableEntity
            {
                PartitionKey = GeneratePartitionKey(),
                RowKey = GenerateRowKey(bidAsk.Id),
                DateTime = bidAsk.DateTime,
                Bid = bidAsk.Bid,
                Ask = bidAsk.Ask
            };
        }
    }
    
    public class BidAskRepository : IBidAskRepository
    {
        private readonly IMyNoSqlServerClient<BidAskMySqlTableEntity> _table;

        public BidAskRepository(IMyNoSqlServerClient<BidAskMySqlTableEntity> table)
        {
            _table = table;
        }
        
        public async Task<IEnumerable<IBidAsk>> GetAllAsync()
        {
            var partitionKey = BidAskMySqlTableEntity.GeneratePartitionKey();
            return await _table.GetAsync(partitionKey);
        }


        public async Task UpdateAsync(IEnumerable<IBidAsk> items)
        {

            foreach (var item in items)
            {
                var newEntity = BidAskMySqlTableEntity.Create(item);
                await _table.InsertOrReplaceAsync(newEntity);
            }
        }
    }
}