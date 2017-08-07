export var utils = {

  attrComparator(attr:string) {
    return (a, b) => {
      if (a[attr] > b[attr]) return 1;
      if (a[attr] < b[attr]) return -1;
      return 0;
    }
  },

  attrsComparator(attrs:string[]) {
    return (a, b) => {
      let i = 0;
      while (i < attrs.length) {
        let res = this.attrComparator(attrs[i++])(a, b);
        if (res) {
          return res;
        }
      }
      return 0;
    }
  }

};
