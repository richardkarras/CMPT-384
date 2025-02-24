# Use different containers

This task would guide you to put the plugins into different containers. This
would allow a more flexible dashboard configuration.

The are three different containers availale, `"main"`, `"sidebar"`, and `""`.

The `""` container basically means it would not be shown, which is useful for
putting data provider or map layer plugins that does not need to show an UI.

The `"sidebar"` container can be specified with an extra prop `"slot"` as
`"top"`. To do this, add a `containerProps` prop alongside the `container` prop
with the value of `{"slot": "top"}`. If this is set, the plugin would be shown
at the top of sidebar and would not able to be collapsed.

There is also a large plugin view that we use in the previous task, which can be
considered as a specical container. It cannot be configured using the
configuration file, but only able to be toggled by the button.

Go to [`./config.json`](./config.json), modify the container prop to see the
differences.
