using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HeatMap.Domains;
using MyNoSqlServerClient;

namespace HeatMap.Services
{


    public class OvershootIndicatorDataEntity : IOvershootIndicatorData
    {
        public double Delta { get; set; }
        public double Overshot { get; set; }

        public static OvershootIndicatorDataEntity Create(IOvershootIndicatorData src)
        {
            return new OvershootIndicatorDataEntity
            {
                Delta = src.Delta,
                Overshot = src.Overshot
            };
        }
    }

    public class OvershootIndicatorNoSqlEntity : MyNoSqlTableEntity
    {
        public static string GeneratePartitionKey()
        {
            return "oi";
        }

        public static string GenerateRowKey(string assetPair)
        {
            return assetPair;
        }

        internal string GetAssetPair()
        {
            return RowKey;
        }

        public OvershootIndicatorDataEntity[] Overshoots { get; set; }

        public static OvershootIndicatorNoSqlEntity Create(string assetId, IEnumerable<IOvershootIndicatorData> overshoots)
        {
            return new OvershootIndicatorNoSqlEntity
            {
                PartitionKey = GeneratePartitionKey(),
                RowKey = GenerateRowKey(assetId),
                Overshoots = overshoots.Select(OvershootIndicatorDataEntity.Create).ToArray()
            };
        }
    }
    
    public class OvershootIndicatorsDataRepository : IOvershootIndicatorsDataRepository
    {
        private readonly IMyNoSqlServerClient<OvershootIndicatorNoSqlEntity> _tableData;

        public OvershootIndicatorsDataRepository(IMyNoSqlServerClient<OvershootIndicatorNoSqlEntity> tableData)
        {
            _tableData = tableData;
        }
        
        public async ValueTask UpdateAsync(IEnumerable<KeyValuePair<string, IEnumerable<IOvershootIndicatorData>>>  indicatorData)
        {
            var entities = indicatorData.Select(kvp => OvershootIndicatorNoSqlEntity.Create(kvp.Key, kvp.Value)).ToArray();
            await _tableData.BulkInsertOrReplaceAsync(entities);
        }

        public async ValueTask<Dictionary<string, IEnumerable<IOvershootIndicatorData>>> GetAsync()
        {
            var partitionKey = OvershootIndicatorNoSqlEntity.GeneratePartitionKey();

            var result = await _tableData.GetAsync(partitionKey);

            return result.ToDictionary(itm => itm.GetAssetPair(),
                itm => itm.Overshoots.Cast<IOvershootIndicatorData>());
            
        }
        
        
    }
}