# JSON expression

This is an example of a possible way to evaluate logic using the JSON
configuration file.

This example shows that we are somehow able to put some logic into the JSON
configuration. When this dashboard is loaded, it ask user input for two numbers.
Then the result value is evaluated based on a JSON expression in the config
file.

For this example, we provided two custom pre-defined functions for the JSON
expression (`v1` and `v2`), which basically just returns the user input value
from the dashboard. In the JSON expression, we defined two functions
(`factorial` and `fibonacci`). Finally, we yield an object that calls these
functions.

The main idea here is that, the way to use `v1` and `v2` as well as what value
would be yield are defined and configurable from the JSON instead of the plugin
logic. But depending on which pre-defined functions are provided to the
evaluator, we can control the maximum ability level of the JSON expression.

Depending on what custom pre-defined functions are provided, we can make the
config file much more powerful but in control.
