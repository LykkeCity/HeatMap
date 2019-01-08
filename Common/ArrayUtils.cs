using System.Collections.Generic;

namespace Common
{
    public static class ArrayUtils
    {

        public static T[] Add<T>(this T[] src, T newItem, int? maxSize = null)
        {
            if (src == null)
                return new[] {newItem};

            if (src.Length == 0)
                return new[] {newItem};

            var list = new List<T>();
            list.AddRange(src);
            list.Add(newItem);

            if (maxSize == null) 
                return list.ToArray();
            
            while (list.Count > maxSize)
                list.RemoveAt(0);

            return list.ToArray();
        }

    }
}