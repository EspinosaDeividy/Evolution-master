namespace Evolution.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterNameFieldEnderecoTransportadoras : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Transportadora", "Endereco", c => c.String(maxLength: 250));
            DropColumn("dbo.Transportadora", "Enredeco");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Transportadora", "Enredeco", c => c.String(maxLength: 250));
            DropColumn("dbo.Transportadora", "Endereco");
        }
    }
}
