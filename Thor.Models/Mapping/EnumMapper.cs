using System;
using System.Linq;

namespace Thor.Models.Mapping
{
    public static class EnumMapper
    {
        public static string ToFriendlyString<TEnum>(this TEnum value) where TEnum : struct, Enum
        {
            return value.ToString().ToLower();
        }

        public static TEnum ToEnum<TEnum>(this string value) where TEnum : struct, Enum
        {
            var values = Enum.GetValues<TEnum>();
            return values.FirstOrDefault(x => string.Equals(x.ToFriendlyString(), value));
        }
    }
}