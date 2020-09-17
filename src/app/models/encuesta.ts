export class Encuesta {
    constructor (
        public id,
        public quiz_one: string,
        public quiz_three: string,
        public quiz_two: string,
        public created_at: string,
        public id_client?: number,
        public id_client_private?: number,
    ) {}
}
