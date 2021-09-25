const up = async (pgm) => {
  pgm.createTable("users", {
    id: "id",
    email: { type: "varchar(200)", notNull: true, unique: true },
    password: { type: "varchar(400)", notNull: true },
    salt: { type: "varchar(50)", notNull: true },
    firstname: { type: "varchar(1000)", notNull: true },
    lastname: { type: "varchar(1000)", notNull: true },
    patronymic: { type: "varchar(1000)" },
    address: { type: "varchar(256)" },
    private_key: { type: "varchar(1000)" },
  });

  pgm.createTable("applications", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "cascade",
    },
    address: { type: "varchar(256)", notNull: true },
    public: { type: "boolean", default: "true" },
  });
  pgm.createIndex("applications", "user_id");

  pgm.createTable("documents", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "cascade",
    },
    name: { type: "varchar(256)", notNull: true },
  });
};

exports.up = up;
