export class Building {
    constructor(public name: string,
        public id: number
    ) { }

    static fromJSONArray(array: Array<Object>): Building[] {
        return array.map(
            obj => new Building(
                obj['name'],
                obj['id']
            )
        );
    }
}