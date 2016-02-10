namespace Evolution.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CampoObrigatorioUsuario : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Usuario", "Nome", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Usuario", "Nome", c => c.String());
        }
    }
}
