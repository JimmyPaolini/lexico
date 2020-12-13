type Imperative = {
  active: {
    present: ImperativePresent
    future: {
      singular: {
        second: string[]
        third: string[]
      }
      plural: {
        second: string[]
        third: string[]
      }
    }
  }
  passive: {
    present: ImperativePresent
    future: {
      singular: {
        second: string[]
        third: string[]
      }
      plural: {
        third: string[]
      }
    }
  }
}

type ImperativePresent = {
  singular: {
    second: string[]
  }
  plural: {
    second: string[]
  }
}
