namespace Evolution.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CampoObrigatorioClassificacao : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Classificacao", "Descricao", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Classificacao", "Descricao", c => c.String());
        }
    }
}
