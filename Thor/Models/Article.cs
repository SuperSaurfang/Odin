using System;

namespace Thor.Models {
  public class Article {
    // Author, `Title`, `ArticleText`, `CreationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled
    public int ArticleId {get; set;}
    public string Title {get; set;}
    public string ArticleText {get; set;}
    public string UserName {get; set;}
    public DateTime CreationDate {get; set;}
    public DateTime ModificationDate {get; set;}
    public bool HasCommentsEnabled {get; set;}
    public bool HasDateAuthorEnabled {get; set;}
  }
}