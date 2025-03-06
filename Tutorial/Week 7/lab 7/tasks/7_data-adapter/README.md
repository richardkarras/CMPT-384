# Implement a data adapter to handle custom data type

This task would guide you to implement a data provider and to consume its
provided data. This would allow a more flexible plugin implemetation.

This time, we would have two plugins, one is for providing data and one is for
consuming data. Usually, a data provider is a adaptor that let other VGA plugins
to be able to consume a specific data type and a data consumer could be any VGA
plugin that needs some data to work (such as charts).

First, go to [`./consumer.plugin.js`](./consumer.plugin.js) and check how we
query for data. Then, go to [`./provider.plugin.js`](./provider.plugin.js), find
`TODO` labels, and follow its instructions.
