namespace Thor.Util
{
  public enum UnderlayingDatabase {
    MongoDB,
    MariaDB,
    SQLLite,
    Redis
  }

  public enum Change
  {
    Change,
    NoChange,
    Error
  }

  public enum StatusResponseType
  {
    Create,
    Update,
    Delete
  }

}