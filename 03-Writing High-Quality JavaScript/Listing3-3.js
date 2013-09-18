describe("The add function", function() {
    it("Adds 1 + 2 + 3 together correctly", function() {
        var output = add(1, 2, 3);
        expect(output).toEqual(6);
    });

    it("Adds negative numbers together correctly", function() {
        var output = add(-1, -2, -3);
        expect(output).toEqual(-6);
    });
});
