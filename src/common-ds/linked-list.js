/**
 * Contains methods for linked list
 * -> if there is any feature/function you need 
 * -> it is save to extend from this unless 
 * -> adding new common features such as pop, isEmpty etc
 */
const Node = require('./node')

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    // if modified it will lead to errors
    append(value) {
        let node = new Node(value)
        if(!this.head) {
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node
            this.tail = node
        }
    }

    // if modified -> it might lead to errors
    addAll(arr) {
        arr.forEach(item => {
            this.append(item)
        })
    }
}

module.exports = LinkedList
