# File-group

Tiny script written in _javascript_ to **group the file system into folders**. Given a directory and a choosen pre-built algorithm it use some criterias to filter and naming the director. In some ways, it works as a simplified version of GROUP operation in SQL world

## Installation

Use [npm](http://npmjs.com/) to install file-group

```bash
npm install -g file-group
```

## Usage

The only required option is the `--aggregate | -a` which you specify the aggregation algoritm.

```javascript
file-group -a name-date <directory>
```

### Choosing an aggregator

You can one of pre-built aggregator algorithms

```javascript
file-group --aggregator alphabetical <directory>
```

### Aggregators

| Aggregator                   |                              description                               |
| ---------------------------- | :--------------------------------------------------------------------: |
| `alphabetical` (**default**) |           Group folders into alphabetical order from A to Z            |
| `name-date`                  | Match name followed by date format. eg. `Best shorts - 2020-09-12.txt` |

## Roadmap

The next step is to provide your own filter/naming (WIP) convention to perform the operation.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Project status

The current project is under _development_, thereof some features may contain some inconsistencies. ~~Please, checks the code coverage for more informations~~
