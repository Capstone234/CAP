var TABLES_SQL = [];

if(__DEV__){
  const DROP_SQL = [
    `
  DROP TABLE IF EXISTS MultiResponse;
    `,
    `
  DROP TABLE IF EXISTS MultiResponsePart;
    `,
    `
  DROP TABLE IF EXISTS SingleResponse;
    `,
    `
  DROP TABLE IF EXISTS VOMSSymptoms;
    `,
    `
  DROP TABLE IF EXISTS VOMSNPCDistance;
    `,
    `
  DROP TABLE IF EXISTS VOMSSymptomReport;
    `,
    `
  DROP TABLE IF EXISTS User;
    `,
    `
  DROP TABLE IF EXISTS Incident;
    `,
    `
  DROP TABLE IF EXISTS RedFlag;
    `,
    `
  DROP TABLE IF EXISTS MemoryTest;
    `,
    `
  DROP TABLE IF EXISTS VerbalTest;
    `,
    `
  DROP TABLE IF EXISTS PCSS;
    `,
    `
  DROP TABLE IF EXISTS Reaction;
    `,
    `
  DROP TABLE IF EXISTS Balance;
    `,
    `
  DROP TABLE IF EXISTS HopTest;
    `,
    `
  DROP TABLE IF EXISTS SymptomReport;
    `



  ];
  TABLES_SQL.push(...DROP_SQL);
}

CREATE_TABLES_SQL = [

  //Instance of a multiple part response
  `
CREATE TABLE IF NOT EXISTS MultiResponse (
    mr_id INTEGER PRIMARY KEY,
    report_id INTEGER REFERENCES IncidentReport(report_id),
    description VARCHAR(100),
    UNIQUE(report_id, description)
);`,
  //A part of a multi response
  `
CREATE TABLE IF NOT EXISTS MultiResponsePart (
    mrp_id INTEGER PRIMARY KEY,
    mr_id INTEGER REFERENCES MultiResponse(mr_id)
      ON DELETE CASCADE,
    response VARCHAR(50)
);`,
  // Instance of a single response
  `
CREATE TABLE IF NOT EXISTS SingleResponse (
    sr_id INTEGER PRIMARY KEY,
    report_id INTEGER REFERENCES IncidentReport(report_id),
    response VARCHAR(500),
    description VARCHAR(100),
    UNIQUE(report_id, description)
);
`,
  // User responses for symptom check after each VOMS test section
  `
CREATE TABLE IF NOT EXISTS VOMSSymptomReport (
    symptom_report_id INTEGER PRIMARY KEY,
    symptom_name VARCHAR(50),
    patient_id INTEGER REFERENCES Account(account_id),
    report_id INTEGER REFERENCES PrelminiaryReport(report_id),
    headache_rating INTEGER CHECK(headache_rating >= 0 and headache_rating <= 10),
    nausea_rating INTEGER CHECK(nausea_rating >= 0 and nausea_rating <= 10),
    dizziness_rating INTEGER CHECK(dizziness_rating >= 0 and dizziness_rating <= 10),
    fogginess_rating INTEGER CHECK(fogginess_rating >= 0 and fogginess_rating <= 10)
);
`,
  // User responses for Near Point of Convergence distance input
  `
CREATE TABLE IF NOT EXISTS VOMSNPCDistance (
    vomsNPCDistance_id INTEGER PRIMARY KEY,
    report_id INTEGER REFERENCES IncidentReport(report_id),
    distance FLOAT(20)
);
`,
  `
  CREATE TABLE IF NOT EXISTS User (
    uid INTEGER PRIMARY KEY,
    username VARCHAR(50),
    fname VARCHAR(50),
    sname VARCHAR(50),
    age INT,
    weight INT,
    email VARCHAR(100),
    password VARCHAR(50)
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS Incident (
    uid INTEGER,
    iid INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50),
    incident VARCHAR(255),
    finishedupto INT,
    finished BIT,
    datetime DATETIME,
    nextreport DATETIME,
    FOREIGN KEY (uid) REFERENCES User(uid)
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS RedFlag (
    uid INTEGER,
    iid INTEGER,
    neckPainTenderness BIT,
    doubleVision BIT,
    weakTingleBurnArmsLegs BIT,
    headacheIncreasingSever BIT,
    convulsionsSeizures BIT,
    lossConsciousness BIT,
    deterioratingConsciousState BIT,
    vomiting BIT,
    restlessnessIncreasing BIT,
    combativenessAgitation BIT,
    redFlagPass BIT,
    PRIMARY KEY (uid, iid),
    FOREIGN KEY (uid, iid) REFERENCES Incident(uid, iid)
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS MemoryTest (
    uid INTEGER,
    iid INTEGER,
    correctAnswersTest1 INT,
    correctAnswersTest2 INT,
    memoryPass1 BIT,
    memoryPass2 BIT,
    PRIMARY KEY (uid, iid),
    FOREIGN KEY (uid, iid) REFERENCES Incident(uid, iid)
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS VerbalTest (
    uid INTEGER,
    iid INTEGER,
    patientName BIT,
    patientWhere BIT,
    patientWhy BIT,
    whatMonth BIT,
    whatYear BIT,
    patientConfused BIT,
    patientWords BIT,
    patientIncomprehensible BIT,
    patientNoResponse BIT,
    verbalPass BIT,
    PRIMARY KEY (uid, iid),
    FOREIGN KEY (uid, iid) REFERENCES Incident(uid, iid)
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS PCSS (
    uid INTEGER,
    iid INTEGER,
    headache INT,
    nausea INT,
    vomiting INT,
    balance INT,
    dizziness INT,
    fatigue INT,
    light INT,
    noise INT,
    numb INT,
    foggy INT,
    slowed INT,
    concentrating INT,
    remembering INT,
    drowsiness INT,
    sleep_less INT,
    sleep_more INT,
    sleeping INT,
    irritability INT,
    sadness INT,
    nervousness INT,
    emotional INT,
    blurry INT,
    pcssPass BIT,
    PRIMARY KEY (uid, iid),
    FOREIGN KEY (uid, iid) REFERENCES Incident(uid, iid)
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS Reaction (
    uid INTEGER,
    iid INTEGER,
    time1 INT,
    time2 INT,
    time3 INT,
    average INT,
    reactionPass BIT,
    PRIMARY KEY (uid, iid),
    FOREIGN KEY (uid, iid) REFERENCES Incident(uid, iid)
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS Balance (
    uid INTEGER,
    iid INTEGER,
    variance1 DECIMAL(5, 2),
    deviation1 DECIMAL(5, 2),
    variance2 DECIMAL(5, 2),
    deviation2 DECIMAL(5, 2),
    balancePass1 BIT,
    balancePass2 BIT,
    PRIMARY KEY (uid, iid),
    FOREIGN KEY (uid, iid) REFERENCES Incident(uid, iid)
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS HopTest (
    uid INTEGER,
    iid INTEGER,
    hops INT,
    hopPass BIT,
    PRIMARY KEY (uid, iid),
    FOREIGN KEY (uid, iid) REFERENCES Incident(uid, iid)
  );
  `,//new table for reporting symptoms
  `
  CREATE TABLE IF NOT EXISTS SymptomReport (
    uid INTEGER,
    iid INTEGER,
    sid INTEGER,
    dateTime DATETIME,
    Headache INT,
    Nausea INT,
    Dizzy INT,
    Vomiting INT,
    Balance INT,
    Blurry INT,
    Light INT,
    Noise INT,
    NumbTingle INT,
    Pain INT,
    Slow INT,
    Concentrating INT,
    Remembering INT,
    TroubleSleep INT,
    Fatigued INT,
    Drowsy INT,
    Emotional INT,
    Irritable INT,
    Sadness INT,
    Nervous INT,
    symptomsPass BIT,
    PRIMARY KEY (uid, iid, sid),
    FOREIGN KEY (uid, iid) REFERENCES Incident(uid, iid)
  );
  `,
];


TABLES_SQL.push(...CREATE_TABLES_SQL);

export {TABLES_SQL};