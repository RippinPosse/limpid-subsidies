const up = async (pgm) => {
  pgm.createTable("applicants", {
    id: "id",
    firstname: { type: "varchar(1000)", notNull: true },
    lastname: { type: "varchar(1000)", notNull: true },
    patronymic: { type: "varchar(1000)" },
    address: { type: "varchar(256)" },
    privateKey: { type: "varchar(1000)" },
  });

  pgm.createTable("applications", {
    id: "id",
    applicantId: {
      type: "integer",
      notNull: true,
      references: "applicants",
      onDelete: "cascade",
    },
    address: { type: "varchar(256)", notNull: true },
  });

  pgm.createIndex("applications", "applicantId");
};

exports.up = up;
