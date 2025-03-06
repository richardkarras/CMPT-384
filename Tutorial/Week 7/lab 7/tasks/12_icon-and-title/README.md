# Configure page icon and title

This task would guide you to configure page icon and title.

This time, we are adding a `allow-modifying-page-info` attribute to the
`vga-core` element in [`./index.html`](./index.html). By adding this attribute
tells the VGA core that we allowing the configuration file to modify the page
info (icon and title).

Note that VGA core would only override the content for the icon and title, so a
`<title>` tag and a `<link rel="icon">` tag should be already there in the HTML
page even though they might be empty.

Go to [`./config.json`](./config.json), modify the `favicon` and `pageTitle`
attributes to see the differences.
