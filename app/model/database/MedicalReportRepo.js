/**
 * @module
 */

 export class MedicalReportRepo {
    /**
     *
     * @param {DatabaseAdapter} da
     */
    constructor(da) {
      this.da = da;
    }

    async createMedicalReport(report_id, memory_test1_correct_count,memory_test2_correct_count, a_wptas_question_a, a_wptas_question_b, a_wptas_question_c, a_wptas_question_d, a_wptas_question_e, a_wptas_symptom_a, a_wptas_symptom_b, a_wptas_symptom_c, a_wptas_symptom_d, reaction_test_time_1, reaction_test_time_2,reaction_test_time_3, balance_test1_variance, balance_test1_deviation, balance_test2_variance, balance_test2_deviation, hop_test_pre_form, hop_test_count, hop_test_post_form) {
      const sql =
        'INSERT INTO MedicalReport (report_id, memory_test1_correct_count, memory_test2_correct_count, a_wptas_question_a, a_wptas_question_b, a_wptas_question_c, a_wptas_question_d, a_wptas_question_e, a_wptas_symptom_a, a_wptas_symptom_b, a_wptas_symptom_c, a_wptas_symptom_d, reaction_test_time_1, reaction_test_time_2, reaction_test_time_3, balance_test1_variance, balance_test1_deviation, balance_test2_variance, balance_test2_deviation, hop_test_pre_form, hop_test_count, hop_test_post_form) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

      return new Promise((resolve, reject) => {
        this.da.runSqlStmt(sql, [report_id, memory_test1_correct_count,memory_test2_correct_count, a_wptas_question_a, a_wptas_question_b, a_wptas_question_c, a_wptas_question_d, a_wptas_question_e, a_wptas_symptom_a, a_wptas_symptom_b, a_wptas_symptom_c, a_wptas_symptom_d, reaction_test_time_1, reaction_test_time_2,reaction_test_time_3, balance_test1_variance, balance_test1_deviation, balance_test2_variance, balance_test2_deviation, hop_test_pre_form, hop_test_count, hop_test_post_form]).then((rs) => {
          resolve(rs.insertId);
        }, reject);
      });
    }

    async getCurrentMedicalReportInformation(reportId) {
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const sql = `SELECT report_id, memory_test1_correct_count, memory_test2_correct_count, a_wptas_question_a, a_wptas_question_b, a_wptas_question_c, a_wptas_question_d, a_wptas_question_e, a_wptas_symptom_a, a_wptas_symptom_b, a_wptas_symptom_c, a_wptas_symptom_d, reaction_test_time_1, reaction_test_time_2,reaction_test_time_3, balance_test1_variance, balance_test1_deviation, balance_test2_variance, balance_test2_deviation, hop_test_pre_form, hop_test_count, hop_test_post_form FROM MedicalReport WHERE report_id = ?;`;
      const args = [reportId];

      const rs = await this.da.runSqlStmt(sql, args);
      return rs.rows.item(0);

    }

    /**
     *
     * @param {number} reportId
     * @param {number} memory_test_result
     * @returns
     */
    async updateMemoryTestReportResult1(reportId, memory_test1_correct_count){
        if (reportId === undefined || reportId === null) {
          throw 'Invalid reportId';
        }

        const rs = await this.da.runSqlStmt(
        `UPDATE MedicalReport SET memory_test1_correct_count = ? WHERE report_id = ?;`,
        [memory_test1_correct_count, reportId],
        );
        return rs.insertId;

    }
    async updateMemoryTestReportResult2(reportId, memory_test2_correct_count){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET memory_test2_correct_count = ? WHERE report_id = ?;`,
      [memory_test2_correct_count, reportId],
      );
      return rs.insertId;

  }



  async updateReactionTestResults(reportId, reaction_test_time_1, reaction_test_time_2, reaction_test_time_3){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET reaction_test_time_1 = ?, reaction_test_time_2 = ?, reaction_test_time_3 = ? WHERE report_id = ?;`,

      [reaction_test_time_1, reaction_test_time_2, reaction_test_time_3, reportId],

      );
      return rs.insertId;

    }
    async updateBalanceTest1Result(reportId, balance_test1_variance, balance_test1_deviation){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET balance_test1_variance = ?, balance_test1_deviation = ? WHERE report_id = ?;`,
      [balance_test1_variance,balance_test1_deviation, reportId],

      );
      return rs.insertId;

  }
  async updateBalanceTest2Result(reportId, balance_test2_variance, balance_test2_deviation){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET balance_test2_variance = ?, balance_test2_deviation = ? WHERE report_id = ?;`,
      [balance_test2_variance,balance_test2_deviation, reportId],

      );
      return rs.insertId;
   }

    async updateHopTestResults(reportId, hop_test_pre_form, hop_test_count, hop_test_post_form){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET hop_test_pre_form = ?, hop_test_count = ?, hop_test_post_form = ? WHERE report_id = ?;`,
      [hop_test_pre_form, hop_test_count, hop_test_post_form, reportId],
      );
      return rs.insertId;
    }

  //Method to add result of A-WPTAS question A to DB
    async updateAWptasAnswerA(reportId, a_wptas_question_a){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET a_wptas_question_a = ? WHERE report_id = ?;`,
      [a_wptas_question_a, reportId],
      );
      return rs.insertId;
    }

    //Method to add result of A-WPTAS question B to DB
    async updateAWptasAnswerB(reportId, a_wptas_question_b){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET a_wptas_question_b = ? WHERE report_id = ?;`,
      [a_wptas_question_b, reportId],
      );
      return rs.insertId;

    }

    //Method to add result of A-WPTAS question C to DB
    async updateAWptasAnswerC(reportId, a_wptas_question_c){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET a_wptas_question_c = ? WHERE report_id = ?;`,
      [a_wptas_question_c, reportId],
      );
      return rs.insertId;

    }

    //Method to add result of A-WPTAS question D to DB
    async updateAWptasAnswerD(reportId, a_wptas_question_d){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET a_wptas_question_d = ? WHERE report_id = ?;`,
      [a_wptas_question_d, reportId],
      );
      return rs.insertId;

    }

    //Method to add result of A-WPTAS question E to DB
    async updateAWptasAnswerE(reportId, a_wptas_question_e){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET a_wptas_question_e = ? WHERE report_id = ?;`,
      [a_wptas_question_e, reportId],
      );
      return rs.insertId;

    }

    //Method to add result of A-WPTAS symptom A to DB
    async updateAWptasSymptomA(reportId, a_wptas_symptom_a){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET a_wptas_symptom_a = ? WHERE report_id = ?;`,
      [a_wptas_symptom_a, reportId],
      );

      return rs.insertId;

    }

    //Method to add result of A-WPTAS symptom B to DB
    async updateAWptasSymptomB(reportId, a_wptas_symptom_b){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET a_wptas_symptom_b = ? WHERE report_id = ?;`,
      [a_wptas_symptom_b, reportId],
      );
      return rs.insertId;

    }

    //Method to add result of A-WPTAS symptom C to DB
    async updateAWptasSymptomC(reportId, a_wptas_symptom_c){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET a_wptas_symptom_c = ? WHERE report_id = ?;`,
      [a_wptas_symptom_c, reportId],
      );
      return rs.insertId;

    }

    //Method to add result of A-WPTAS symptom D to DB
    async updateAWptasSymptomD(reportId, a_wptas_symptom_d){
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      const rs = await this.da.runSqlStmt(
      `UPDATE MedicalReport SET a_wptas_symptom_d = ? WHERE report_id = ?;`,
      [a_wptas_symptom_d, reportId],
      );
      return rs.insertId;

    }

    async checkValueAWptasQuestion(reportId, questionId) {
      if (reportId === undefined || reportId === null) {
        throw 'Invalid reportId';
      }

      console.log("reportID " + reportId);
      console.log("questionID " + questionId);

      let sql = "";
      const args = [reportId];
      let rs;

      switch (questionId) {
        case 0:
          sql = `SELECT a_wptas_question_a FROM MedicalReport WHERE report_id = ?;`;
          rs = await this.da.runSqlStmt(sql, args);
          return rs.rows.item(0)["a_wptas_question_a"];
        case 1:
          sql = `SELECT a_wptas_question_b FROM MedicalReport WHERE report_id = ?;`;
          rs = await this.da.runSqlStmt(sql, args);
          return rs.rows.item(0)["a_wptas_question_b"];
        case 2:
          sql = `SELECT a_wptas_question_c FROM MedicalReport WHERE report_id = ?;`;
          rs = await this.da.runSqlStmt(sql, args);
          return rs.rows.item(0)["a_wptas_question_c"];
        case 3:
          sql = `SELECT a_wptas_question_d FROM MedicalReport WHERE report_id = ?;`;
          rs = await this.da.runSqlStmt(sql, args);
          return rs.rows.item(0)["a_wptas_question_d"];
        case 4:
          sql = `SELECT a_wptas_question_e FROM MedicalReport WHERE report_id = ?;`;
          rs = await this.da.runSqlStmt(sql, args);
          return rs.rows.item(0)["a_wptas_question_e"];
        default:
          console.err("Error in checkValueAWptasSymtom");
          return null;
      }

    }
}
