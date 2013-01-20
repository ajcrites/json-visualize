# JSON Visualize
I constantly see [Stackoverflow](http://stackoverflow.com)
questions about how to access particular JSON values,
usually along the lines of

    obj.item

not working when

    obj[0].item

is what is desired.

JSON Visualize does some very simple parsing of JSON to
create a DOM-based visualization that makes it easy to
see what path is required to select the desired value.

## Using
**TODO**: Create a test html page of my own.

Create a test HTML page with a single element with id of
`container`.  Then, include the JsonVisualize script, and
make sure that you have access to a JSON object or object
string (either will work).  Use like so:

    (new JsonVisualize(objectVariableName)).display();

The `title` attribute on all scalar element values (blue
with the provided CSS included) contains the path to
access said value.

## Things to come
* Correct increasing left margin on `structure`s after
  `name`s (i.e. stop it)
* Allow for continuous display of titles on click
 * Also display all titles simultaneously with special
   button click or something
* Include path to non-scalar values as well
