import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

class ProgramRepository {
  async readAll() {
    //executer le select
    const [rows] = await databaseClient.query<Rows>("select * from program");
    //retourner le tableau des programmes
    return rows as Program[];
  }
}

export default new ProgramRepository();
