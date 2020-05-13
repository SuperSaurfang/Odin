namespace Thor.Util
{
  public enum UnderlayingDatabase {
    MongoDB,
    MariaDB,
    SQLLite,
    Redis
  }

  public enum ChangeResponse {
    Change,
    NoChange,
    Error
  }

}