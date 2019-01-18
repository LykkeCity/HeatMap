using System;
using System.Collections.Generic;
using System.Linq;
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

        public bool Up { get; set; }

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
        
        public async ValueTask<IEnumerable<IBidAsk>> GetAllAsync()
        {
            var partitionKey = BidAskMySqlTableEntity.GeneratePartitionKey();
            return await _table.GetAsync(partitionKey);
        }

        public async Task UpdateAsync(IEnumerable<IBidAsk> items)
        {
            var entities = items.Select(BidAskMySqlTableEntity.Create);
            await _table.BulkInsertOrReplaceAsync(entities);
        }
        
    }
}