using System.Collections.Generic;
using System.Threading.Tasks;

namespace HeatMap.Domains
{
    public interface IOvershootIndicatorData
    {
        double Delta { get; }
        double Overshot { get; }
    }



    public interface IOvershootIndicatorsDataRepository
    {
        ValueTask UpdateAsync(IEnumerable<KeyValuePair<string, IEnumerable<IOvershootIndicatorData>>>  indicatorData);


        ValueTask<Dictionary<string, IEnumerable<IOvershootIndicatorData>>> GetAsync();
    }
}