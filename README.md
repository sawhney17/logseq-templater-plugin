>If this plugin helps you, I'd really appreciate your support. You can [buy me a coffee here. ](https://www.buymeacoffee.com/sawhney17)
# SmartBlocks for Logseq
![GitHub all releases](https://img.shields.io/github/downloads/sawhney17/logseq-smartblocks/total) ![version](https://img.shields.io/github/package-json/v/sawhney17/logseq-smartblocks)

This plugin enables advanced templating workflows within logseq. 

Currently porting features from the official Smartblocks from Roam plugin. Feel free to ping me on twitter [@aryansawhney17](https://twitter.com/aryansawhney17), or file a github issue for any feedback or feature requests. 


# Features

## Template Inserter
### Setup
1. Use the slash menu and type `Create smartblock button block`
2. Update the values through the input

### Usage in action
![Screen Recording 2022-01-16 at 5 19 50 PM](https://user-images.githubusercontent.com/80150109/149662222-79f0fa35-c2d8-4070-93d9-a39b0b7b4982.gif)
![Screen Recording 2022-01-30 at 12 48 51 AM](https://user-images.githubusercontent.com/80150109/151677540-a9b24fdd-3139-42c5-bfb8-8d0ad967dd84.gif)
![Screen Recording 2022-03-31 at 10 54 10 AM](https://user-images.githubusercontent.com/80150109/161001870-3dac3eae-8e61-4c40-9568-144f01f401d9.gif)


### Expand from smartblock expander
- In version 3.0.0, you can now expand and select a smartblock _while_ inserting, similar to how Logseq's templates work. 
- Simply type mod+t or /insert smartblocks and navigate to the desired Smartblock and then hit enter or click it
	- You can search to filter in this view
### Types of expansion
- You can either expand by creating a templater button or create an inline smartblock expansion
- Running smartblocks expansion templater
	- Use the slash command to insert templater or templater guided 
	- Follow the below syntax for flags and setup of the original template
- Running smartblocks expansion inline
	- Use the slash command to insert templater inline
	- Follows slightly different syntax for flags with the format being `{{renderer :smartblockInline, templateName, sibling?}}`
	- Sample: `{{renderer :smartblockInline, journalTemplate, true}}`
	- When this is in a block marked template, then this won't auto expand to allow for usage in regular logseq templates or as a daily note template
### Flags
- You can configure the templater in the following ways
	1. Set template(required)
	2. Set title(required for button)
	3. Set sibling true or false(required for button)
		- Whether you want the template to be inserted as a sibling(as a new bullet _not_ a child of the button), or as a child (indented under the button)
- Basic structure of the button expansion is as such 
	- `{{renderer :smartblock, journalTemplate, New Journal, false}}`

### Accessing page properties
### Encode URL method 
1. A useful application for SmartBlocks is automatically generating URLs or iFrame embeds based on things like the page name
2. In this case it becomes useful to format variables into page names. 
3. Hence, by simply adding a second `%` you can have it encoded into URL format.
	- `<%%currentPage%>`
### Using NLP
1. In the templates, wherever you want a dynamic date, one that shows a different value based on the date it was inserted, use this syntax `<%NLP Input%>`
	- `<%Today%>`
	- `<%Last monday%>`
	- `<%current time%>` 
	- `<%30th of december%>` 
2. Automatically respects your date settings
	- Your format will automatically generate a specific date 
3. Support Aliases
	- `[tomorrow](<%tomorrow%>)` in the template generates `[tomorrow]([[Jan 19th, 2022]])`
![Screen Recording 2022-01-18 at 12 36 29 PM](https://user-images.githubusercontent.com/80150109/149903174-1187c911-76c3-44be-87dc-a35e5fb37d5a.gif)
### Using if statements with dates
1. If you want an item in a template to only show up on a certain day of the week 
2. Follow the below syntax
	- if the day of the week is monday
		- `<%if dayofweek = 1: text to be entered%>`
	- if it's the 22th
		- `<%if dayofmonth = 22: text to be entered%>`
	- if it's the 100th day of the year
		- `<%if dayofyear = 100: text to be entered%>`
	- if it's July
		- `<%month%> = 7: text to be entered`
3. As of the latest release, you can now have OR statements to result in insertion if *any* of the properties are in action. Simply separate the parameters with `||`. Some examples are as follows
	- if it's either january or a monday
		- `<%if month = 1|| if dayofweek = 1 : text to be entered%>`
	- if it's a weekend
		- `<%if dayofweek = 6|| if dayofweek = 7 : text to be entered%>`
### Using the Random Function
- Limited scope at the moment, can currently fetch a random block linking to a page and create a reference to the random block
- Use `<randomblock Name of page/tag>`
	-`<randomblock twitter>`
	-`<randomblock Tasks Inbox>`

### Call renderers using randUUID
- If you'd like to integrate things like the wordcount plugin, you can do so by generating a random alphanumeric using using <%randUUID%>
- {{renderer :wordcount_<%randUUID%>}} will insert a new word counter whenever the smartblock is called provided the word counter plugin is installed
### Set inputs and use variables
- You can ask the user for inputs. You can then reuse this input multiple times in the smartblock
- To set an input, use `<setInput: variableName%>`
- If you'd like you give a dropdown list of options, use `<%setInput: variableName:comma,separated,options%>`
- To get the input of an already set input, i.e. if you want to use something twice, do `<%getInput: variableName%>`
### Using the weather function
- Makes it possible to grab the current weather from Open Weather Map API
- Format used is `<%weatherf Dubai%>`
	- Start with weather
	- Add the desired format, either `f` for farenheight or `c` for celcius
	- Add your current location, don't be too speciifc, weather data *may* not always be available for more specific searches
- Format returned is `30° 🌧`
### Using the current Page function
- If you want to import the current page into the template as a dynamic variable, simply insert the placeholder `<%currentPage%>`
- Study <%currentPage%> on <%tomorrow%>
- Will return `Study [[Nuclear Physics]] [[Feb 3, 2022]]`

### Limitations
- ~~Only works with dynamic variables up to 4 blocks deep~~ fixed in latest update

### TODO
- [x] Enable support for natural language processing for dates allowing for dynamic dates (different date auto added based on current date)
- [x] Allow user to set variables via inputs
- [ ] Allow NLP dates in if statements

### Using variables and inputs
![Screen Recording 2022-02-08 at 11 58 41 AM](https://user-images.githubusercontent.com/80150109/152961013-3dd95af1-beb3-45ad-9f12-4b62176517df.gif)

- If you update to the latest version, you can create inputs and variables
- To set an input use the variable <%setinput: inputName%>
	- When you call the smartblock, you will then be able to define inputs for those inputs, they will auto replace these blocks
- To access the property of an existing input, let's say you've already set the input `people` using <%setinput: people%>
	- You can now access the already defined input via the line <%getinput: people%> without it prompting you again. 
- You can even pass dynamic variables like <%current page%> as an input!
## Property Renderer
Has been shifted to it's own plugin: https://github.com/sawhney17/logseq-property-visualizer


# Credits 
> If you like the work I'm doing, consider [buying me a coffee](https://www.buymeacoffee.com/sawhney17) :)
- [Sherlockjs](https://github.com/neilgupta/Sherlock)
- Thanks a ton to [hkgnp](https://github.com/hkgnp) and his [NLP plugin](https://github.com/hkgnp/logseq-datenlp-plugin) for implementation inspiration
- Credits to the original SmartBlocks plugin for Roam by [@tfthacker](https://twitter.com/tfthacker)
- Thanks to OpenWeatherMap for weather data
