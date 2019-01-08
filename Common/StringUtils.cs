using System;

namespace Common
{
    public static class StringUtils
    {
        public static string AddLastSymbolIfNotExists(this string src, char symbol)
        {
            if (string.IsNullOrEmpty(src))
                return "" + symbol;

            return src[src.Length - 1] == symbol ? src : src + symbol;
        }

    }
}