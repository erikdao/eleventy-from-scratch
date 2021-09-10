module.exports = {
  /**
   * Returns back some attributes based on whether the link
   * is active or a parent of an active item
   */
  getLinkActiveState(itemUrl, pageUrl) {
    let response = '';

    if (itemUrl === pageUrl) {
      response = ' aria-current="page"';
    }

    if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
      response += ' data-state="active"';
    }

    return response;
  },

  /**
   * Filters out the passed items from the passed collection
   * and randomises and limits them based on flags
   *
   * @param {Array} collection
   * @param {Object} item
   * @param {Number} limit
   * @param {Boolean} random
   */
  getSiblingContent(collection, item, limit=3, random=true) {
    let filteredItems = collection.filter(x => x.url !== item.url);
    if (random) {
      let counter = filteredItems.length;
      while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = filteredItems[counter];
        // Swap the last element with the random one
        filteredItems[counter] = filteredItems[index];
        filteredItems[index] = temp;
      }
    }

    // Trim to length
    if (limit > 0) {
      filteredItems = filteredItems.slice(0, limit);
    }

    return filteredItems;
  },
  /**
   * Take an array of keys and return back items that match.
   * Note: items in the collection must have a key attribute in
   * Front Matter
   * @param {Array} collection
   * @param {Array} keys
   */
  filterCollectionByKeys(collection, keys) {
    return collection.filter(x => keys.includes(x.data.key));
  }
};
