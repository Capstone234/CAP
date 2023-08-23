/**
 * @module
 */

 export class PreliminaryReportRepo {
    /**
     *
     * @param {DatabaseAdapter} da
     */
    constructor(da) {
      this.da = da;
    }
  
    /**
     *
     * @param {number} patientId patient to create report for
     * @return {Promise<number>} promise of the inserted report id
     */

    // async createReport(patientId, reportId, memory_test1_result,memory_test2_result,reaction_test_result,balance_test1_result, balance_test2_result) {
    //   const sql = 'INSERT INTO PreliminaryReport (patient_id, report_id, memory_test1_result,memory_test2_result, reaction_test_result, balance_test1_result , balance_test2_result) VALUES (?, ?, ?, ?, ?, ?, ?);';
    //   const args = [patientId, reportId, memory_test1_result,memory_test2_result,reaction_test_result,balance_test1_result,balance_test2_result];

    //   let rs = await this.da.runSqlStmt(sql, args);
  
    //   return rs.insertId;
    // }

    async createReport(patientId,date_of_test, memory_test1_result,memory_test2_result,reaction_test_result,balance_test1_result, balance_test2_result, hop_test_result) {
      const sql =
        'INSERT INTO PreliminaryReport (patient_id, date_of_test, memory_test1_result, memory_test2_result, reaction_test_result, balance_test1_result, balance_test2_result, hop_test_result) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
  
      return new Promise((resolve, reject) => {
        this.da.runSqlStmt(sql, [patientId,date_of_test, memory_test1_result,memory_test2_result,reaction_test_result,balance_test1_result, balance_test2_result, hop_test_result]).then((rs) => {
          resolve(rs.insertId);
        }, reject);
      });
    }
  
    /**
     *
     * @param {number} patientId patient to update report for
     * @param {number} reportId report to be updated
     * @return {Promise<number>} promise of the affected rows
     */
    async updateReportPatientId(patientId, reportId) {
      const sql =
        'UPDATE PreliminaryReport SET patient_id = ? WHERE report_id == ?;';
      const args = [patientId, reportId];
  
      return new Promise((resolve, reject) => {
        this.da.runSqlStmt(sql, args).then(
          (rs) => resolve(rs.rowsAffected),
          (err) => reject(err),
        );
      });
    }
  
    /**
     *
     * @param {number} patientId patient to update report for
     * @return {Promise<any[]>} promise of the reportIds
     */
    async getPatientReports(patientId) {
      const sql = 'SELECT * FROM PreliminaryReport WHERE patient_id = ?;';
      const args = [patientId];
  
      return new Promise((resolve, reject) => {
        this.da.runSqlStmt(sql, args).then(
          (rs) => resolve(rs.rows._array),
          (err) => reject(err),
        );
      });
    }
    /**
     *
     * @param {number} patientId report id
     * @return {Promise<any[]>} array of SingleResponse rows
     */
    async getListofPatientReports(patientId) {
        const sql = 'SELECT * FROM PreliminaryReport WHERE patient_id = ?;';
        const args = [patientId];

        return new Promise((resolve, reject) => {
        this.da.runSqlStmt(sql, args).then(
          (rs) => {
            if (rs.rows.length < 1) {
            // reject(new Error(`No report in  ${patientId}`));
            return [];
            }
            //console.log(rs.rows._array);
            resolve(rs.rows._array);
        });
        });
    }
    async getCurrentReportInformation(reportId) {
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }
  
      const sql = `SELECT report_id, date_of_test, patient_id, memory_test1_result, memory_test2_result, reaction_test_result, balance_test1_result, balance_test2_result, hop_test_result FROM PreliminaryReport WHERE report_id = ?;`;
      const args = [reportId];
  
      const rs = await this.da.runSqlStmt(sql, args);
      console.log(rs.rows.item(0));
      return rs.rows.item(0);

    }

    async getLatestReportDate() {
  
      const sql = `SELECT date_of_test FROM PreliminaryReport ORDER BY rowid DESC LIMIT 1;`;
  
      const rs = await this.da.runSqlStmt(sql);
      // console.log(rs.rows.item(0));
      return rs.rows.item(0);

    }

    /**
     * @param account_id the id of the account to get the date from.
     * @returns the latest report date based on an accountid, or throws an error.
     */
    async getLatestReportDate(account_id) {
      
      const sql = `SELECT date_of_test FROM PreliminaryReport WHERE patient_id = ? ORDER BY rowid DESC LIMIT 1;`;
  
      const rs = await this.da.runSqlStmt(sql, [account_id]);
      return rs.rows.item(0);
    }

    /**
     * 
     * @param {number} reportId 
     * @param {number} memory_test_result 
     * @returns 
     */  
    async updateMemoryTest1Result(reportId, memory_test1_result){
      
        const rs = await this.da.runSqlStmt(
        `UPDATE PreliminaryReport SET memory_test1_result = ? WHERE report_id = ?;`,
        [memory_test1_result, reportId],
        );
        return rs.insertId;

    }
    async updateMemoryTest2Result(reportId, memory_test2_result){
      
      const rs = await this.da.runSqlStmt(
      `UPDATE PreliminaryReport SET memory_test2_result = ? WHERE report_id = ?;`,
      [memory_test2_result, reportId],
      );
      return rs.insertId;

  }
    /**
     * 
     * @param {number} reportId 
     * @param {number} memory_test_result 
     * @returns 
     */  
     async updateReactionTestResult(reportId, reaction_test_result){
      
        const rs = await this.da.runSqlStmt(
        `UPDATE PreliminaryReport SET reaction_test_result = ? WHERE report_id = ?;`,

        [reaction_test_result, reportId],

        );
        return rs.insertId;

    }
    /**
     * 
     * @param {number} reportId 
     * @param {number} memory_test_result 
     * @returns 
     */  
     async updateBalanceTest1Result(reportId, balance_test1_result){
      
        const rs = await this.da.runSqlStmt(
        `UPDATE PreliminaryReport SET balance_test1_result = ? WHERE report_id = ?;`,
        [balance_test1_result, reportId],

        );
        return rs.insertId;

    }
    async updateBalanceTest2Result(reportId, balance_test2_result){
      
      const rs = await this.da.runSqlStmt(
      `UPDATE PreliminaryReport SET balance_test2_result = ? WHERE report_id = ?;`,
      [balance_test2_result, reportId],

      );
      return rs.insertId;

   }
   
   /**
     * 
     * @param {number} reportId 
     * @param {number} hop_test_result 
     * @returns 
     */  
    async updateHopTestResult(reportId, hop_test_result){
      
      const rs = await this.da.runSqlStmt(
      `UPDATE PreliminaryReport SET hop_test_result = ? WHERE report_id = ?;`,

      [hop_test_result, reportId],

      );
      return rs.insertId;

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
  
    // async changeSingleResponse(ID, text) {
    //   const sql = 'UPDATE SingleResponse SET response = ? WHERE report_id == ?; ';
    //   const args = [text, ID];
    //
    //   return new Promise((resolve, reject) => {
    //     this.da.runSqlStmt(sql, args).then(
    //       (rs) => resolve(rs.insertId),
    //       (err) => reject(err),
    //     );
    //   });
    // }
  
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
  
    /**
     * Stores the reaction test results.
     *
     * Removes existing reaction test result if it exists.
     *
     * @param {number} reportId
     * @param {number[]} attempts 3 attempt results
     * @param {number} average
     * @param {string} grade
     * @return {Promise<number>}
     */
    async setReactionTest(reportId, attempts, average, grade) {
      if (attempts.length !== 3) {
        throw `given attempts has length ${attempts.length}, not 3`;
      }
  
      await this.da.runSqlStmt(`DELETE FROM ReactionTest WHERE report_id = ?`, [
        reportId,
      ]);
  
      const rs = await this.da.runSqlStmt(
        `INSERT INTO ReactionTest (report_id, time_attempt_1, time_attempt_2, time_attempt_3, time_average, grade)
          VALUES (?, ?, ?, ?, ?, ?)`,
        [reportId, ...attempts, average, grade],
      );
      return rs.insertId;
    }
  
    /**
     * Returns the reaction test for the report
     * @param reportId
     * @return {Promise<any>}
     */
    async getReactionTest(reportId) {
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }
  
      const sql = `SELECT time_attempt_1, time_attempt_2, time_attempt_3, time_average, grade FROM ReactionTest WHERE report_id = ?;`;
      const args = [reportId];
  
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


    async createDSL(patient_id, date_of_test,headache_result, nausea_result, dizziness_result, vomiting_result, balance_problem_result, blurry_or_double_vision_result, sensitivity_to_light_result, sensitive_to_noise_result, pain_other_than_headache_result, feeling_in_a_fog_result, feeling_slowed_down_result, difficulty_concentrating_result, difficulty_remembering_result, trouble_fall_asleep_result, fatigue_or_low_energy_result, drowsiness_result, feeling_more_emotional_result, irritability_result,sadness_result, nervousness_result,dsl_result) {
      const sql =
        'INSERT INTO DailySymptomLog (patient_id, date_of_test, headache_result, nausea_result, dizziness_result, vomiting_result, balance_problem_result, blurry_or_double_vision_result, sensitivity_to_light_result, sensitive_to_noise_result, pain_other_than_headache_result, feeling_in_a_fog_result, feeling_slowed_down_result, difficulty_concentrating_result, difficulty_remembering_result, trouble_fall_asleep_result, fatigue_or_low_energy_result, drowsiness_result, feeling_more_emotional_result, irritability_result,sadness_result, nervousness_result,dsl_result) VALUES (?,? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
  
      return new Promise((resolve, reject) => {
        this.da.runSqlStmt(sql, [patient_id, date_of_test, headache_result, nausea_result, dizziness_result, vomiting_result, balance_problem_result, blurry_or_double_vision_result, sensitivity_to_light_result, sensitive_to_noise_result, pain_other_than_headache_result, feeling_in_a_fog_result, feeling_slowed_down_result, difficulty_concentrating_result, difficulty_remembering_result, trouble_fall_asleep_result, fatigue_or_low_energy_result, drowsiness_result, feeling_more_emotional_result, irritability_result,sadness_result, nervousness_result,dsl_result]).then((rs) => {
          resolve(rs.insertId);
        }, reject);
      });
    }

    async updateDSL(dsl_result, logId){
      
      const rs = await this.da.runSqlStmt(
      `UPDATE DailySymptomLog SET dsl_result = ? WHERE log_id = ?;`,
      [dsl_result, logId],

      );
      return rs.insertId;

  }
  async getDSL(logId) {
    

    const sql = `SELECT * FROM DailySymptomLog WHERE log_id = ?;`;
    const args = [logId];

    const rs = await this.da.runSqlStmt(sql, args);
    return rs.rows.item(0);
  }

  async getDSLFromPatient(patientId) {
    

    const sql = `SELECT * FROM DailySymptomLog WHERE patient_id = ?;`;
    const args = [patientId];

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, args).then(
        (rs) => {
          
          if (rs.rows.length < 1) {
          // reject(new Error(`No report in  ${patientId}`));
          return [];
          }
          //console.log(rs.rows._array);
          resolve(rs.rows._array);
      });
      });
  }

  }
  