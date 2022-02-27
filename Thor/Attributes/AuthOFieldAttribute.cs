using System;

namespace Thor.Attributes;

[AttributeUsage(AttributeTargets.Property)]
public class Auth0FieldAttribute : Attribute
{
  public string FieldName { get; }
  public Auth0FieldAttribute(string fieldName)
  {
    FieldName = fieldName;
  }
}