using MySql.Data.MySqlClient;

namespace Thor.DatabaseProvider.ContextProvider
{
  public class MariaContextProvider : IDBContextProvider<MySqlConnection>
  {
    private string connectionString;

    public MariaContextProvider(ConnectionSettings settings)
    {
      connectionString = settings.GetMariaConnectionString();

    }
    public MySqlConnection GetContext()
    {
      return new MySqlConnection(connectionString);
    }
  }
}