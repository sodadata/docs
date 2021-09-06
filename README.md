Soda documentation guidelines
==================

Join us in our mission to help users become productive and confident using Soda software.

The following outlines the workflow to contribute.
1. [Set up docs tooling](#set-up-docs-tooling) locally on your machine and clone the GitHub repo.
2. Create a new branch for your work. Include the word `docs` in the name of your branch.
3. Follow the [style guidelines](#style-guidelines) to edit existing or write new content using [markdown](#use-jekyll-markdown).
4. Adjust the nav order of any new files in the `docs` > `nav.yml` file.
5. Spell check your content (select all and copy to Google Docs for a thorough check) and test all links.
6. Commit your contributions, create a pull request, and request a review, if you wish.
7. When all tests pass, merge your pull request.
8. Celebrate your new life as a published author!

### Set up docs tooling

Soda uses the following tools to build and publish documentation.
- [GitHub](https://github.com/sodadata/soda-sql) to store content
- [Jekyll](https://jekyllrb.com/docs/) to build and serve content
- [Just the Docs](https://pmarsceill.github.io/just-the-docs/) to apply a visual theme

To contribute to Soda documentation, set up your local system to author and preview content before committing it.

1. Jekyll requires Ruby 2.4.0 or higher. If necessary, upgrade or install Ruby locally.
2. Install two Ruby gems: bundler and jekyll. Refer to [Jekyll documentation](https://jekyllrb.com/docs/installation/) for details.
```shell
$ gem install --user-install bundler jekyll
```
3. Clone the sodadata/docs repo from GitHub.
4. From the command-line, navigate to the `docs` repo directory, then run `bundle install` to install all the necessary gems.
5. Open the cloned repo locally in your favorite code editor such as Visual Code or Sublime.
6. From the command-line, navigate to the `docs` repo directory, then run the following to build and serve docs locally.
```shell
$ bundle exec jekyll serve
```
7. In a browser, navigate to [http://localhost:4000/soda-sql/](http://localhost:4000/soda-sql/) to see a preview of the docs site locally. Make changes to docs files in your code editor, save the files, then refresh your browser to preview your changes.
8. If you are creating a new page, consider copy+pasting the contents of the `template-new-page.md` file and pasting into your new file so that the standard header and footer info are included.


### Style guidelines

Soda uses the [Splunk Style Guide](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Howtouse) for writing documentation. For any questions about style or language that are not listed below, refer to the Splunk Style Guide for guidance.

Language:
- Use American English.
- Use [plain](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Technicallanguage) language. Do not use jargon, colloquialisms, or meme references.
- Use [unbiased](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Inclusivity) language. For example, instead of "whitelist" and "blacklist", use "passlist" and "denylist".
- Avoid writing non-essential content such as welcome messages or backstory.
- When referring to a collection of files, use "directory", not "folder".
- Use "you" and "your" to refer to the reader.
- Do not refer to Soda, the company, as participants in documentation: "we", "us", "let's", "our".
- Use [active voice](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Activeandpresent).
- Use present tense and imperative mood. See the [Set up docs tooling](#set-up-docs-tooling) section above for an example.
- Avoid the subjunctive mood: "should", "would", "could".
- Make the language of your lists [parallel](https://ewriteonline.com/how-and-why-to-make-your-lists-parallel-and-what-does-parallel-mean/).

Good practice:
- Never write an FAQ page or section. FAQs are a randomly organized bucket of content that put the burden on the reader to find what they need. Instead, consciously think about when and where a user needs the information and include it there.
- Include code snippets and commands.
- Limit inclusion of screencaps. These images are hard to keep up-to-date as the product evolves.
- Include diagrams.
- Do not use "Note:" sections. Exception: to indicate incompatibility or a known issue.
- Use includes rather than repeat or re-explain something.

Formatting:
- Use **bold** for the first time you mention a product name or feature in a document or to identify a **Tip:** for using a feature. See [Warehouse YAML]({% link soda-sql/warehouse.md %}) for an example. Otherwise, use it sparingly. Too much bold font renders the format meaningless.
- Use *italics* sparingly for emphasis, primarily on the negative. For example, "Limit the scan to *only* test data from today."
- Use ALL CAPS only for severe warnings. For example, "DO NOT store sensitive information."
- Use sentence case for all titles and headings.
- Use H1 headings for the page title. Use H2 and H3 as subheadings. Use H4 headings to introduce example code snippets.
- Never stack headings with no content between them. Add content or remove a heading, likely the latter so as to avoid adding non-essential text.
- Use [bulleted lists](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Bulletlists) for non-linear lists.
- Use [numbered lists](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Tasklists) for procedures or ordered tasks.
- Use relative links to link to other files or sections in Soda documentation.
- Use hard-coded links to link to external sources.
- Liberally include links to the [Glossary]({% link soda/glossary.md %}), but only link the first instance of a term on a page, not all instances.

Content:
- Categorize your new content according to the following macro groups:
   - Concepts - content that explains in general, without including procedural steps. Characterized by a title that does not use present tense imperative such as, "How Soda SQL works" or "Metrics".
   - Tasks - content that describes the steps a user takes to complete a task or reach a goal. Characterized by a title that is in present tense imperative such as, "Install Soda SQL" or "Apply filters".
   - Reference - content that presents lists or tables of reference material such as error codes or glossary.
- Produce content that focuses on how to achieve a goal or solve a problem and, insofar as it is practical, is inclusive of all products. Avoid creating documentation that focuses on how to use a single product. For example, instead of writing two documents -- one for "Troubleshoot Soda SQL" and one for "Troubleshoot Soda Cloud" -- write one Troubleshoot document that offers guidance for both tools.
- Remember that Every Page is Page One for your reader. Most people enter your docs by clicking on the result of a Google search, so they could land anywhere and you should assume your new page is the first page that a new reader lands on. Give them the context for what they are reading, lots of "escape hatches" to the glossary or pre-requisite procedures, and instructions on what to read next in a "Go further" section at the bottom of all Concept or Task pages.

### Use Jekyll markdown

Kramdown is the default markdown renderer that Jekyll uses.

Insert image:

Add a `png` file of your logically-named image to the `docs/assets/images` directory, then add this markdown:
```
![scan-anatomy](/assets/images/scan-anatomy.png){:height="440px" width="440px"}
```

Includes:

Add a markdown file of your logically-named include content to the `docs/_includes` directory, then add this markdown:
```
{% include run-a-scan.md %}
```

Relative links:
```
[warehouse yaml]({% link soda-sql/warehouse.md %})

[airflow_bash.py](/../examples/airflow_bash.py)
```

Link to anchor:

```
[warehouse yaml]({% link soda-sql/warehouse.md %}#to-anchor)
```

Link to section on same page:

```
[example](#example-tests-using-a-column-metric)
```

External link:

```
[Wikipedia](https://en.wikipedia.org)
```

Comment out:

```
<!-- This content does not display on the web page. -->
```

Show code:
```
{% raw %}
{% endraw %}
```
To keep the numbered list intact, apply endraw to the end of the line of preceding text; do not prepend with a line break.


### Redirecting site visitors

The `jekyll-redirect-from` plugin is installed, allowing authors to redirect users if a page is moved. 

See documentation: https://github.com/jekyll/jekyll-redirect-from

To apply a redirect, navigate to the redirect destination file, then add the following to the file metadata at the top:

`redirect_from: /pageyouwanttoredirect/`


### Adding Last modified date
```
{% last_modified_at %}
```

### Adding collapse-expand toggle

```
<details>
    <summary>Click to expand</summary>
    Long content here
    and here
</details>
```