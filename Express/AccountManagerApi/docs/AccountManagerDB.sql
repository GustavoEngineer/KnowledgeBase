CREATE TABLE IF NOT EXISTS "digitalidentities" (
	"id_identitie" serial NOT NULL UNIQUE,
	"identitie_name" varchar(50) NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	PRIMARY KEY ("id_identitie")
);

CREATE TABLE IF NOT EXISTS "credentials" (
	"id_credential" serial NOT NULL UNIQUE,
	"password" varchar(350) NOT NULL,
	"id_account" bigint NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"url" varchar(400) NOT NULL,
	PRIMARY KEY ("id_credential")
);

CREATE TABLE IF NOT EXISTS "accounts" (
	"id_account" serial NOT NULL UNIQUE,
	"id_identitie" bigint NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"access_key" varchar(350) NOT NULL,
	"url" varchar(400) NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"is_active" boolean NOT NULL,
	PRIMARY KEY ("id_account")
);


ALTER TABLE "credentials" ADD CONSTRAINT "credentials_fk2" FOREIGN KEY ("id_account") REFERENCES "accounts"("id_account");
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_fk1" FOREIGN KEY ("id_identitie") REFERENCES "digitalidentities"("id_identitie");