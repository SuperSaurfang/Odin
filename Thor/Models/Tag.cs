using System.Collections.Generic;


namespace Thor.Models
{
  public class Tag
  {
    public int TagId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public override int GetHashCode()
    {
      int hashName = Name == null ? 0 : Name.GetHashCode();

      int hashDescription = Description == null ? 0 : Description.GetHashCode();

      int hashTagId = TagId.GetHashCode();

      return hashName ^  hashDescription ^ hashTagId;
    }

  }

  public class TagComparer : EqualityComparer<Tag>
  {
    public override bool Equals(Tag x, Tag y)
    {
      //x and y are equal if the TagId is the same
      return x.TagId == y.TagId;
    }

    public override int GetHashCode(Tag obj)
    {
      return obj.GetHashCode();
    }
  }
}