export class Employee {
    constructor(
        public id: number,
        public name: string,
        public dateOfBirth: Date,
        public alias?: string, // ?: cho phép null
        public jobCategory?: string
    ) {}
}
