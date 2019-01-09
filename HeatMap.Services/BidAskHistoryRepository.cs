using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HeatMap.Domains;
using MyNoSqlServerClient;

namespace HeatMap.Services
{
    public class BidAskHistoryTableEntity : MyNoSqlTableEntity, IBidAskHistory
    {

        public static string GeneratePartitionKey()
        {
            return "history";
        }

        public static string GenerateRowKey(string id)
        {
            return id;
        }


        public string Id => RowKey;
        public double[] History { get; set; }


        public static BidAskHistoryTableEntity Create(IBidAskHistory src)
        {
            return new BidAskHistoryTableEntity
            {
                PartitionKey = GeneratePartitionKey(),
                RowKey = GenerateRowKey(src.Id),
                History = src.History                    
            };
        }
    }
    
    public class BidAskHistoryRepository : IBidAskHistoryRepository
    {
        private readonly IMyNoSqlServerClient<BidAskHistoryTableEntity> _table;

        public BidAskHistoryRepository(IMyNoSqlServerClient<BidAskHistoryTableEntity> table)
        {
            _table = table;
        }


        public async Task UpdateAsync(IEnumerable<IBidAskHistory> items)
        {
            var entities = items.Select(BidAskHistoryTableEntity.Create);
            await _table.BulkInsertOrReplaceAsync(entities);
        }
        
        public async Task<IBidAskHistory> GetAsync(string id)
        {
            var partitionKey = BidAskHistoryTableEntity.GeneratePartitionKey();
            var rowKey = BidAskHistoryTableEntity.GenerateRowKey(id);
            return await _table.GetAsync(partitionKey, rowKey);
        }

        public async Task<IEnumerable<IBidAskHistory>> GetAllAsync()
        {
            var partitionKey = BidAskHistoryTableEntity.GeneratePartitionKey();
            return await _table.GetAsync(partitionKey);
        }
    }
}