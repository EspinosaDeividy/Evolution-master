namespace Evolution.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Create_Tables_And_Relationships : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Classificacao",
                c => new
                    {
                        ClassificacaoID = c.Int(nullable: false, identity: true),
                        Descricao = c.String(),
                    })
                .PrimaryKey(t => t.ClassificacaoID);
            
            CreateTable(
                "dbo.Transportadora",
                c => new
                    {
                        TransportadoraID = c.Int(nullable: false, identity: true),
                        NomeRazaoSocial = c.String(nullable: false, maxLength: 100),
                        Enredeco = c.String(maxLength: 250),
                        numero = c.Int(nullable: false),
                        Bairro = c.String(maxLength: 100),
                        Cidade = c.String(maxLength: 100),
                        Estado = c.String(maxLength: 100),
                        UsuarioID = c.Int(nullable: false),
                        ClassificacaoID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.TransportadoraID)
                .ForeignKey("dbo.Classificacao", t => t.ClassificacaoID, cascadeDelete: true)
                .ForeignKey("dbo.Usuario", t => t.UsuarioID, cascadeDelete: true)
                .Index(t => t.TransportadoraID, unique: true, name: "TransportadoraID")
                .Index(t => t.UsuarioID, unique: true, name: "UsuarioID")
                .Index(t => t.ClassificacaoID);
            
            CreateTable(
                "dbo.Usuario",
                c => new
                    {
                        UsuarioID = c.Int(nullable: false, identity: true),
                        Nome = c.String(),
                    })
                .PrimaryKey(t => t.UsuarioID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Transportadora", "UsuarioID", "dbo.Usuario");
            DropForeignKey("dbo.Transportadora", "ClassificacaoID", "dbo.Classificacao");
            DropIndex("dbo.Transportadora", new[] { "ClassificacaoID" });
            DropIndex("dbo.Transportadora", "UsuarioID");
            DropIndex("dbo.Transportadora", "TransportadoraID");
            DropTable("dbo.Usuario");
            DropTable("dbo.Transportadora");
            DropTable("dbo.Classificacao");
        }
    }
}
