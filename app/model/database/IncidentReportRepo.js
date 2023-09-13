/**
 * @module
 */

export class IncidentReportRepo {
  /**
   *
   * @param {DatabaseAdapter} da
   */
  constructor(da) {
    this.da = da;
  }

  /**
   * Inserts a new incident report for a user.
   * @param {int} uid User ID.
   * @param {string} username Username of the user.
   * @param {string} incident Incident description.
   * @param {int} finishedupto Number of tests completed.
   * @param {int} finished 0 for unfinished, 1 for finished.
   * @param {datetime} datetime Date and time of the report.
   * @param {datetime} nextReportDateTime Date and time of the next report.
   * @returns {Promise<number>} Promise of the inserted report id.
   */
   async createReport(uid, username, incident, finishedupto, finished) {
     try {
       const sql = `
         INSERT INTO Incident (uid, username, incident, finishedupto, finished, datetime, nextreport)
         VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, DATETIME('now', '+1 day'));
       `;
       const args = [uid, username, incident, finishedupto, finished];

       const rs = await this.da.runSqlStmt(sql, args);
       return rs.insertId;
     } catch (error) {
       // Log the error if one occurs during the SQL execution
       console.error("Error inserting into the database:", error);
       throw error; // Rethrow the error so it can be handled elsewhere if needed
     }
   }



  /**
   * Update an existing incident report.
   * @param {int} uid User ID.
   * @param {int} iid Incident ID to update.
   * @param {string} username Updated username.
   * @param {string} incident Updated incident description.
   * @param {int} finishedupto Updated number of tests completed.
   * @param {int} finished Updated finished status (0 for unfinished, 1 for finished).
   * @param {datetime} datetime Updated date and time of the report.
   * @returns {Promise<void>} Promise that resolves when the update is complete.
   */
  async updateIncident(uid, iid, username, incident, finishedupto, finished, datetime) {
    const sql = `
      UPDATE Incident
      SET
        username = ?,
        incident = ?,
        finishedupto = ?,
        finished = ?,
        datetime = ?
      WHERE
        uid = ? AND iid = ?;
    `;
    const args = [username, incident, finishedupto, finished, datetime, uid, iid];
    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs.rowsAffected),
        (err) => reject(err),
      );
    });
  }

  async incrementTestStage(iid) {
    // Execute the UPDATE statement to increment the value
    const sql = `
      UPDATE Incident
      SET finishedupto = finishedupto + 1
      WHERE iid = ?;
    `;

    const args = [iid];

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs.rowsAffected),
        (err) => reject(err),
      );
    });
  }

  async updateIncidentUid(uid, iid) {
    // Execute the UPDATE statement to change the uid of an incident
    const sql = `
      UPDATE Incident
      SET uid to ?
      WHERE iid = ?;
    `;

    const args = [uid, iid];

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs.rowsAffected),
        (err) => reject(err),
      );
    });
  }

  /**
   *
   * @param {int} uid userid
   * @return {Promise<any[]>} promise of all incidentsReport for that user
   */
   async getIncidents(uid) {
     const sql = 'SELECT * FROM Incident WHERE uid = ?;';
     const args = [uid];

     try {
       const rs = await this.da.runSqlStmt(sql, args);
       const data = rs.rows._array;
       return data;
     } catch (error) {
       throw error;
     }
   }



  /**
   *
   * @param {int} uid user id
   * @param {int} iid incident id
   * @returns {Promise<any[]>} Promise all Daily Symptom reports from Incident
   */
  async getAllDailySymtoms(uid, iid) {
    const sql = 'SELECT * FROM SymptomReport WHERE uid = ? AND iid = ?;';
    const args = [uid, iid];

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs.row._array),
        (err) => reject(err),
      );
    });
  }


  /**
   * Get Specific daily symptom report
   * @param {*} uid user id
   * @param {*} iid incident id
   * @param {*} sid symptom report id
   * @return {Promise} Promise to return A Daily Symptom report
   */
  async getDailySymtoms(uid, iid, sid) {
    if ((uid === undefined || uid === null) && (iid === undefined || iid === null) && (sid === undefined || sid === null)) {
      throw "Cannot find Report";
    }
    const sql = 'SELECT * FROM SymptomReport WHERE uid = ? AND iid = ? AND sid = ?;';
    const args = [uid, iid, sid];

    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows.item(0);
  }



  /**
   *
   * @param {int} uid
   * @param {int} iid
   * @returns {Promise <any[]>} Promise all data in one prelim report
   */

  async getPrelimReports(uid, iid) {
    const sql = `
      SELECT *
      FROM RedFlag
      INNER JOIN MemoryTest ON RedFlag.uid = MemoryTest.uid AND RedFlag.iid = MemoryTest.iid
      INNER JOIN VerbalTest ON RedFlag.uid = VerbalTest.uid AND RedFlag.iid = VerbalTest.iid
      INNER JOIN PCSS ON RedFlag.uid = PCSS.uid AND RedFlag.iid = PCSS.iid
      INNER JOIN Reaction ON RedFlag.uid = Reaction.uid AND RedFlag.iid = Reaction.iid
      INNER JOIN Balance ON RedFlag.uid = Balance.uid AND RedFlag.iid = Balance.iid
      INNER JOIN HopTest ON RedFlag.uid = HopTest.uid AND RedFlag.iid = HopTest.iid
      WHERE RedFlag.uid = ? AND RedFlag.iid = ?;
    `;
    const args = [uid, iid];

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs.rows._array),
        (err) => reject(err),
      );
    });
  }







  /**
   *
   * @param {number} reportId
   * @param {string} description description of response
   * @param {string} response value of response
   * @return {Promise<number>} promise of single response id
   */
  async setSingleResponse(reportId, description, response) {
    await this.da.runSqlStmt(
      `DELETE FROM SingleResponse WHERE report_id = ? AND description = ?;`,
      [reportId, description],
    );

    const rs = await this.da.runSqlStmt(
      `INSERT INTO SingleResponse (report_id, description, response) VALUES (?, ?, ?);`,
      [reportId, description, response],
    );
    return rs.insertId;
  }

  /**
   *
   * @param {number} reportId report id
   * @return {Promise<any[]>} array of SingleResponse rows
   */
  async getSingleResponses(reportId) {
    const sql = 'SELECT * FROM SingleResponse WHERE report_id == ?;';
    const args = [reportId];

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then((rs) => {
        if (rs.rows.length < 1) {
          reject(new Error(`No single response in report ${reportId}`));
          return;
        }
        resolve(rs.rows._array);
      });
    });
  }

  /**
   * Store multi response in db
   * @param {number}reportId report id
   * @param {string}description description of response
   * @param {string[]}responses values of responses
   * @return {Promise<number>} resolves with the MultiResponse id
   */
  async setMultiResponse(reportId, description, responses) {
    await this.da.runSqlStmt(
      'DELETE FROM MultiResponse WHERE report_id = ? AND description = ?;',
      [reportId, description],
    );

    const rs = await this.da.runSqlStmt(
      'INSERT INTO MultiResponse (report_id, description) VALUES (?, ?);',
      [reportId, description],
    );
    const mrId = rs.insertId;

    await this.da.runSqlStmt('DELETE FROM MultiResponsePart WHERE mr_id = ?;', [
      mrId,
    ]);

    // Add each part of the response
    for (let res of responses) {
      await this.da.runSqlStmt(
        'INSERT INTO MultiResponsePart (mr_id, response) VALUES (?, ?);',
        [mrId, res],
      );
    }
    return mrId;
  }

  /**
   *
   * @param reportId report id
   * @return {Promise<any[]>} array of MultiResponses rows, parts of the multi
   * response are store in .MultiResponsePart
   */
  async getMultiResponses(reportId) {
    let error = null;
    let mrs = null; // multi responses
    await this.da
      .runSqlStmt('SELECT * FROM MultiResponse WHERE report_id == ?;', [
        reportId,
      ])
      .then(
        (rs) => (mrs = rs.rows._array),
        (err) => (error = err),
      );

    if (error != null) {
      return new Promise((resolve, reject) => reject(error));
    }

    for (let mr of mrs) {
      // Add each of the response parts
      await this.da
        .runSqlStmt('SELECT * FROM MultiResponsePart WHERE mr_id = ?', [
          mr.mr_id,
        ])
        .then(
          (rs) => {
            mr.MultiResponsePart = rs.rows._array;
          },
          (err) => (error = err),
        );

      if (error != null) {
        return new Promise((resolve, reject) => reject(error));
      }
    }

    console.log(mrs);

    return new Promise((resolve) => {
      resolve(mrs);
    });
  }


  async setReaction(uid, iid, time1, time2, time3, average, pass) {
    const sql = `
      INSERT INTO Reaction (uid, iid, time1, time2, time3, average, reactionPass)
      VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const args= [uid, iid, time1, time2, time3, average, pass];
    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs), // Resolve the promise when successful
        (err) => reject(err),
      );
    });
  }

  async setRedFlag(uid, iid, neckPainTenderness, doubleVision, weakTingleBurnArmsLegs, headacheIncreasingSever, convulsionsSeizures, lossConsciousness, deterioratingConsciousState, vomiting, restlessnessIncreasing, combativenessAgitation, pass) {
    const sql = `
      INSERT INTO RedFlag (uid, iid, neckPainTenderness, doubleVision, weakTingleBurnArmsLegs, headacheIncreasingSever, convulsionsSeizures, lossConsciousness, deterioratingConsciousState, vomiting, restlessnessIncreasing, combativenessAgitation, redFlagPass)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const args= [uid, iid, neckPainTenderness, doubleVision, weakTingleBurnArmsLegs, headacheIncreasingSever, convulsionsSeizures, lossConsciousness, deterioratingConsciousState, vomiting, restlessnessIncreasing, combativenessAgitation, pass];
    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs), // Resolve the promise when successful
        (err) => reject(err),
      );
    });
  }

  async setVerbalTest(uid, iid, patientName, patientWhere, patientWhy, whatMonth, whatYear, patientConfused, patientWords, patientIncomprehensible, patientNoResponse, pass) {
    const sql = `
      INSERT INTO VerbalTest (uid, iid, patientName, patientWhere, patientWhy, whatMonth, whatYear, patientConfused, patientWords, patientIncomprehensible, patientNoResponse, verbalPass)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const args= [uid, iid, patientName, patientWhere, patientWhy, whatMonth, whatYear, patientConfused, patientWords, patientIncomprehensible, patientNoResponse, pass];
    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs), // Resolve the promise when successful
        (err) => reject(err),
      );
    });
  }

  async setBalance(uid, iid, variance1, deviation1, variance2, deviation2, pass1, pass2) {
    const sql = `
      INSERT INTO Balance (uid, iid, variance1, deviation1, variance2, deviation2, balancePass1, balancePass2)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
    const args= [uid, iid, variance1, deviation1, variance2, deviation2, pass1, pass2];
    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs), // Resolve the promise when successful
        (err) => reject(err),
      );
    });
  }

  async setHop(uid, iid, hops, pass) {
    const sql = `
      INSERT INTO HopTest (uid, iid, hops, hopPass)
      VALUES (?, ?, ?, ?);`;
    const args= [uid, iid, hops, pass];
    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs), // Resolve the promise when successful
        (err) => reject(err),
      );
    });
  }

  async setPCSS(uid, iid, headache, nausea, vomiting, balance, dizziness, fatigue, light, noise, numb, foggy, slowed, concentrating, remembering, drowsiness, sleep_less, sleep_more, sleeping, irritability, sadness, nervousness, emotional, blurry, pass) {
    const sql = `
      INSERT INTO PCSS (uid, iid, headache, nausea, vomiting, balance, dizziness, fatigue, light, noise, numb, foggy, slowed, concentrating, remembering, drowsiness, sleep_less, sleep_more, sleeping, irritability, sadness, nervousness, emotional, blurry, pcssPass)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const args= [uid, iid, headache, nausea, vomiting, balance, dizziness, fatigue, light, noise, numb, foggy, slowed, concentrating, remembering, drowsiness, sleep_less, sleep_more, sleeping, irritability, sadness, nervousness, emotional, blurry, pass];
    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs), // Resolve the promise when successful
        (err) => reject(err),
      );
    });
  }

  async setMemory(uid, iid, correctAnswersTest1, correctAnswersTest2, pass1, pass2) {
    const sql = `
      INSERT INTO MemoryTest (uid, iid, correctAnswersTest1, correctAnswersTest2, memoryPass1, memoryPass2)
      VALUES (?, ?, ?, ?, ?, ?);`;
    const args= [uid, iid, correctAnswersTest1, correctAnswersTest2, pass1, pass2];
    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs), // Resolve the promise when successful
        (err) => reject(err),
      );
    });
  }

  async setSymptomReport(uid, iid, sid, dateTime, Headache, Nausea, Dizzy, Vomiting, Balance, Blurry, Light, Noise, Pain, Slow, Concentrating, Remembering, TroubleSleep, Fatigued, Drowsy, Emotional, Irritable, Sadness, Nervous, Pass) {
    const sql = `
      INSERT INTO SymptomReport (uid, iid, sid, dateTime, Headache, Nausea, Dizzy, Vomiting, Balance, Blurry, Light, Noise, Pain, Slow, Concentrating, Remembering, TroubleSleep, Fatigued, Drowsy, Emotional, Irritable, Sadness, Nervous, symptomsPass)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const args = [uid, iid, sid, dateTime, Headache, Nausea, Dizzy, Vomiting, Balance, Blurry, Light, Noise, Pain, Slow, Concentrating, Remembering, TroubleSleep, Fatigued, Drowsy, Emotional, Irritable, Sadness, Nervous, Pass];
    const rs = await this.da.runSqlStmt(sql, args);
    return rs.insertId;
  }






  async updateMemory(uid, iid, correctAnswersTest1, correctAnswersTest2, pass1, pass2) {
    const sql = `
      UPDATE MemoryTest SET correctAnswersTest1 = ?, correctAnswersTest2=?, memoryPass1=?, memoryPass2=? WHERE uid = ? AND iid = ?;
    `;
    const args= [correctAnswersTest1, correctAnswersTest2, pass1, pass2, uid, iid];
    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs), // Resolve the promise when successful
        (err) => reject(err),
      );
    });
  }

  async updateBalance(uid, iid, variance1, deviation1, variance2, deviation2, pass1, pass2) {
    const sql = `
      UPDATE Balance SET variance1 = ?, deviation1 = ?, variance2 = ?, deviation2 = ?, balancePass1 = ?, balancePass2 = ? WHERE uid = ? AND iid = ?;
    `;
    const args= [variance1, deviation1, variance2, deviation2, pass1, pass2,uid, iid];
    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => resolve(rs), // Resolve the promise when successful
        (err) => reject(err),
      );
    });
  }


  /**
   * Returns the reaction test for the report
   * @param uid user id
   * @param iid incident id
   * @return {Promise<Reaction>}  ReactionTest 1 reaction test per incident
   */
  async getReaction(uid, iid) {
    if ((uid === undefined || uid === null) && (iid === undefined || iid === null)) {
      throw 'Cannot find reaction results';
    }

    const sql = `SELECT time1, time2, time3, average, reactionPass FROM Reaction WHERE uid = ? AND iid = ?;`;
    const args = [uid, iid];

    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows.item(0);
  }

  async getRedFlag(uid, iid) {
    if ((uid === undefined || uid === null) && (iid === undefined || iid === null)) {
      throw 'Cannot find red flag results';
    }
    const sql = `
      SELECT neckPainTenderness, doubleVision, weakTingleBurnArmsLegs, headacheIncreasingSever, convulsionsSeizures, lossConsciousness, deterioratingConsciousState, vomiting, restlessnessIncreasing, combativenessAgitation, redFlagPass FROM RedFlag WHERE uid = ? AND iid = ?;
    `;
    const args= [uid, iid];
    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows.item(0);
  }

  async getVerbalTest(uid, iid) {
    if ((uid === undefined || uid === null) && (iid === undefined || iid === null)) {
      throw 'Cannot find red flag results';
    }
    const sql = `
      SELECT patientName, patientWhere, patientWhy, whatMonth, whatYear, patientConfused, patientWords, patientIncomprehensible, patientNoResponse, verbalPass FROM VerbalTest WHERE uid = ? AND iid = ?;
    `;
    const args= [uid, iid];
    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows.item(0);
  }

  async getBalance(uid, iid) {
    if ((uid === undefined || uid === null) && (iid === undefined || iid === null)) {
      throw 'Cannot find red flag results';
    }
    const sql = `
      SELECT variance1, deviation1, variance2, deviation2, balancePass1, balancePass2 FROM Balance WHERE uid = ? AND iid = ?;
    `;
    const args= [uid, iid];
    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows.item(0);
  }

  async getHop(uid, iid) {
    if ((uid === undefined || uid === null) && (iid === undefined || iid === null)) {
      throw 'Cannot find red flag results';
    }
    const sql = `
      SELECT hops, hopPass FROM HopTest WHERE uid = ? AND iid = ?;
    `;
    const args= [uid, iid];
    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows.item(0);
  }

  async getPCSS(uid, iid) {
    if ((uid === undefined || uid === null) && (iid === undefined || iid === null)) {
      throw 'Cannot find red flag results';
    }
    const sql = `
      SELECT headache, nausea, vomiting, balance, dizziness, fatigue, light, noise, numb, foggy, slowed, concentrating, remembering, drowsiness, sleep_less, sleep_more, sleeping, irritability, sadness, nervousness, emotional, blurry, pcssPass FROM PCSS WHERE uid = ? AND iid = ?;
    `;
    const args= [uid, iid];
    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows.item(0);
  }

  async getMemory(uid, iid) {
    if ((uid === undefined || uid === null) && (iid === undefined || iid === null)) {
      throw 'Cannot find red flag results';
    }
    const sql = `
      SELECT correctAnswersTest1, correctAnswersTest2, memoryPass1, memoryPass2 FROM MemoryTest WHERE uid = ? AND iid = ?;
    `;
    const args= [uid, iid];
    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows.item(0);
  }





  /**
   * Stores the VOMS symptom ratings of headache, nausea, dizziness and fogginess
   * @param reportId
   * @param description
   * @param headache_rating
   * @param nausea_rating
   * @param dizziness_rating
   * @param fogginess_rating
   * @returns {Promise<number>}
   */
  async addVOMSSymptoms(
    reportId,
    description,
    headache_rating,
    nausea_rating,
    dizziness_rating,
    fogginess_rating,
  ) {
    const sql = `INSERT INTO VOMSSymptoms (report_Id, description, headache_rating, nausea_rating, dizziness_rating, fogginess_rating)
        VALUES (?, ?, ?, ?, ?, ?)`;
    const args = [
      reportId,
      description,
      headache_rating,
      nausea_rating,
      dizziness_rating,
      fogginess_rating,
    ];

    const rs = await this.da.runSqlStmt(sql, args);
    return rs.insertId;
  }

  async getAllVOMSSymptoms(reportId) {
    if (reportId === undefined || reportId === null) {
      throw 'Invalid reportId';
    }

    const sql = `SELECT description, headache_rating, nausea_rating, dizziness_rating, fogginess_rating FROM VOMSSymptoms WHERE report_id = ?;`;
    const args = [reportId];

    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows._array;
  }

  async getVOMSSymptoms(reportId, description) {
    if (reportId === undefined || reportId === null) {
      throw 'Invalid reportId';
    }

    const sql = `SELECT headache_rating, nausea_rating, dizziness_rating, fogginess_rating FROM VOMSSymptoms WHERE report_id = ? AND description = ?;`;
    const args = [reportId, description];

    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows.item(0);
  }

  async addVOMSNPCDistance(reportId, distance) {
    const sql = `INSERT INTO VOMSNPCDistance (report_Id, distance)
        VALUES (?, ?)`;
    const args = [reportId, distance];

    const rs = await this.da.runSqlStmt(sql, args);
    return rs.insertId;
  }

  async getVOMSNPCDistance(reportId) {
    if (reportId === undefined || reportId === null) {
      throw 'Invalid reportId';
    }

    const sql = `SELECT distance FROM VOMSNPCDistance WHERE report_id = ?;`;
    const args = [reportId];

    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows.item(0);
  }



  async createVOMSReport(symptom_name, account_id, report_id, headache_rating, nausea_rating, dizziness_rating, fogginess_rating) {
    const sql =
      'INSERT INTO VOMSSymptomReport (symptom_name, patient_id, report_id, headache_rating, nausea_rating, dizziness_rating, fogginess_rating) VALUES (?, ?, ?, ?, ?, ?, ?);';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, [symptom_name, account_id, report_id, headache_rating, nausea_rating, dizziness_rating, fogginess_rating]).then((rs) => {
        resolve(rs.insertId);
      }, reject);
    });
  }

  async getVOMS(symptom_report_id) {


    const sql = `SELECT * FROM VOMSSymptomReport WHERE symptom_report_id = ?;`;
    const args = [symptom_report_id];

    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows.item(0);
  }

  async getVOMSCluster(report_id) {


    const sql = `SELECT symptom_name, patient_id, nausea_rating, dizziness_rating, headache_rating, fogginess_rating FROM VOMSSymptomReport WHERE report_id = ?;`;
    const args = [report_id];

    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows;
  }


}
