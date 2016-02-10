namespace Evolution.Migrations {
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Evolution.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<Evolution.Models.BancoTransportadoras> {
        public Configuration() {
            AutomaticMigrationsEnabled = false;
            ContextKey = "Evolution.Models.BancoTransportadoras";
        }

        protected override void Seed(Evolution.Models.BancoTransportadoras context) {

            //Database.SetInitializer<BancoTransportadoras>(new CreateDatabaseIfNotExists());
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
