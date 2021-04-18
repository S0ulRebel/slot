export class SymbolsBuilder {
    public data: any = {};

    withSymbol(index: number, values: number[]) {
        this.data[index] = values;
        return this;
    }
}