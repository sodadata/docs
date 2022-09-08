Soda documentation guidelines
==================

Join us in our mission to help users become productive and confident using Soda software.

## Contribute

The following outlines the workflow to contribute to Soda documentation.
1. [Set up docs tooling](#set-up-docs-tooling) locally on your machine and clone the GitHub repo.
2. Create a new branch for your work. Include the word `docs` in the name of your branch.
3. Follow the [style guidelines](#style-guidelines) to edit existing or write new content using [markdown](#use-jekyll-markdown).
4. Adjust the nav order of any new files in the `docs` > `nav.yml` file, or `docs` > `navcore.yml` for Soda Core docs.
5. Spell check your content (select all and copy to Google Docs for a thorough check) and test all links.
6. Commit your contributions, create a pull request, and request a review, if you wish.
7. When all tests pass, merge your pull request.
8. Celebrate your new life as a published author!

### Set up docs tooling

Soda uses the following tools to build and publish documentation.
- [GitHub](https://github.com/sodadata/soda-sql) to store content
- [Jekyll](https://jekyllrb.com/docs/) to build and serve content
- [Just the Docs](https://pmarsceill.github.io/just-the-docs/) to apply a visual theme
- [lunrjs](https://lunrjs.com/docs/index.html) to facilitate searches in docs (search bar)

To contribute to Soda documentation, set up your local system to author and preview content before committing it.

1. Jekyll requires Ruby 2.4.0 or higher. If necessary, upgrade or install Ruby locally. If you are using a Mac with an Apple M1 chip, follow the prerequisite steps to [set up Ruby locally](#install-ruby-on-mac-with-an-apple-m1-chip).
2. From Terminal, install two Ruby gems: bundler and jekyll. Refer to [Jekyll documentation](https://jekyllrb.com/docs/installation/) for details.
```shell
$ gem install --user-install bundler jekyll
```
3. Clone the [sodadata/docs](https://github.com/sodadata/docs) repo from GitHub.
4. From the command-line, navigate to the `docs` repo directory, then run `bundle install` to install all the necessary gems.
5. Open the cloned repo locally in your favorite code editor such as Visual Code or Sublime.
6. From the command-line, navigate to the `docs` repo directory that you just cloned, then run the following to build and serve docs locally.
```shell
$ bundle exec jekyll serve
```
7. In a browser, navigate to [http://localhost:4000](http://localhost:4000) to see a preview of the docs site locally. Make changes to docs files in your code editor, save the files, then refresh your browser to preview your changes.
8. If you are creating a new page, consider copy+pasting the contents of the `template-new-page.md` or `template-new-page-core.md` files and pasting into your new file so that the standard header and footer info are included.

#### Install Ruby on Mac with an Apple M1 chip

1. If you have not already done so, install Homebrew by running the following command in Terminal.   
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
2. Configure Terminal to run your shell as a login shell. See <a href="https://github.com/pyenv/pyenv/wiki/MacOS-login-shell" target="_blank">MacOS login shell</a> for details. 
3. As instructed in the command-line output, run the following two commands one-by-one. Replace the target of `echo` to your bash profile file:
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.bash_profile

eval "$(/opt/homebrew/bin/brew shellenv)"
```
3. Optionally, run:  `brew bundle dump`.
4. Install Ruby using the following command. Note that you can use <a href="https://github.com/rbenv/rbenv/blob/master/README.md" target="_blank">`rbenv`</a> to install Ruby if you need to access multiple versions of Ruby on your machine.  
```shell
brew install ruby
```
5. Check the Ruby install by running:   `ruby -v`
6. Add the following to your bash profile file, then save the file.
```shell
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
export LDFLAGS="-L/opt/homebrew/opt/ruby/lib"
export CPPFLAGS="-I/opt/homebrew/opt/ruby/include"
export PKG_CONFIG_PATH="/opt/homebrew/opt/ruby/lib/pkgconfig"
```
7. Source your freshly modified bash profile `source /your/bash_profile/file` or open a new Terminal window.
8. Follow the [Set up docs tooling](#set-up-docs-tooling) above, starting at step 2.

## Style guidelines

Soda uses the [Splunk Style Guide](https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Howtouse) for writing documentation. For any questions about style or language that are not listed below, refer to the Splunk Style Guide for guidance.

### Language
- Use American English.
- Use <a href="https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Technicallanguage" target="_blank">plain</a language. Do not use jargon, colloquialisms, or meme references.
- Use <a href="https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Inclusivity" target="_blank">unbiased</a> language. For example, instead of "whitelist" and "blacklist", use "passlist" and "denylist".
- Avoid writing non-essential content such as welcome messages or backstory.
- When referring to a collection of files, use "directory", not "folder".
- Use "you" and "your" to refer to the reader.
- Do not refer to Soda, the company, as participants in documentation: "we", "us", "let's", "our".
- Use <a href="https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Activeandpresent" target="_blank">active voice</a>.
- Use present tense and imperative mood. See the [Set up docs tooling](#set-up-docs-tooling) section above for an example.
- Avoid the subjunctive mood: "should", "would", "could".
- Make the language of your lists <a href="https://ewriteonline.com/how-and-why-to-make-your-lists-parallel-and-what-does-parallel-mean/" target="_blank">parallel</a>.

### Good practice
- Never write an FAQ page or section. FAQs are a randomly organized bucket of content that put the burden on the reader to find what they need. Instead, consciously think about when and where a user needs the information and include it there.
- Include code snippets and command examples.
- Limit inclusion of screencaps of product UI. These images are hard to keep up-to-date as the product evolves.
- Include diagrams.
- Do not use "Note:" callout boxes. Exception: banner message to indicate deprecated tools or features. 
- Use \_includes rather than repeat or re-explain something. Refer to <a href="https://jekyllrb.com/docs/includes/" target="_blank">Jekyll Includes</a>.

### Formatting
- Use **bold** for the first time you mention a product name or feature in a document or to identify a **Tip:** for using a feature. Otherwise, use it sparingly. Too much bold font renders the format meaningless.
- Use *italics* sparingly for emphasis, primarily on the negative. For example, "Limit the scan to *only* test data from today."
- Do not use underline.
- Use ALL CAPS only for severe warnings. For example, "DO NOT store sensitive information."
- Use sentence case for all titles and headings.
- Use H1 headings for the page title. Use H2 and H3 as subheadings. Use H4 headings to introduce example code snippets.
- Never stack headings with no content between them. Add content or remove a heading, ideally the latter so as to avoid adding non-essential text.
- Use <a href="https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Bulletlists" target="_blank">bulleted lists</a> for non-linear lists.
- Use <a href="https://docs.splunk.com/Documentation/StyleGuide/current/StyleGuide/Tasklists" target="_blank">numbered lists</a> for procedures or ordered tasks.
- Use relative links to link to other files or sections in Soda documentation.
- Use hard-coded links to link to external sources. Ensure the external link opens a new tab in a reader's browser.
- Liberally include links to the Glossary, but only link the first instance of a term on a page, not all instances.

### Content
- Categorize your new content according to the following macro groups:
   - Concepts - content that explains in general, without including procedural steps. Characterized by a title that does not use present tense imperative such as, "How Soda Core works" or "Metrics".
   - Tasks - content that describes the steps a user takes to complete a task or reach a goal. Characterized by a title that is in present tense imperative such as, "Install Soda Core" or "Apply filters".
   - Reference - content that presents lists or tables of reference material such as error codes or glossary.
- Produce content that focuses on how to achieve a goal or solve a problem and, insofar as it is practical, is inclusive of all products. 
- Remember that Every Page is Page One for your reader. Most people enter the docs by clicking on the result of a Google search, so they could land anywhere and you should assume your new page is the first page that a reader lands on. Give them the context for what they are reading, lots of "escape hatches" to the glossary or pre-requisite procedures, and instructions on what to read next in a "Go further" section at the bottom of all Concept or Task pages.

## Image guidelines

- Apply a grey, 1px border around screencap images embedded in pages; diagrams and graphics do not require borders.
- Narrow and tighten any the UI before you take a screencap so as to keep the image legible when embedded to a page.
- Ensure all images are legible.
- Carefully consider whether or not to include a screencap. Is it really necessary? Does it communicate more than just your words do?  Screencaps of UI require regular maintenance to keep up with changes in the UI; is the image you are adding worth the extra maintenance?

## Release note documentation

Document the details of each Soda product's release using included release note files.

1. Create a new branch in this docs repo to create your product release notes.
2. To the `_release-notes` folder in this Docs repo, add a new markdown file for your new product release notes. Follow the file naming structure established by existing files. If you do not recognize a discernable pattern, use a logical name for the feature or functionality you are releasing.
3. Copy and paste the contents of the `template-soda-cloud-rn.md` file or the `template-soda-sql-rn.md` file into your new file.
4. Write your release notes using the style guide for guidance on format, language, etc. Use <a href="https://writing.wisc.edu/handbook/style/ccs_activevoice/" target="_blank">active voice</a>!
5. Spell check your content. (Copy paste to a Google Doc or your favorite editor to run a spell check.)
6. Commit your changes, then create a new pull request when you are ready to publish.
7. In the new pull request, request a review by @janet-can, if you wish. 
8. Any Soda employee reviews, squashes, and mergess the PR.


## Use Jekyll markdown

Kramdown is the default markdown renderer that Jekyll uses. What follows are some Kramdown-specific formatting syntax.

Insert image:

Add a `png` file of your logically-named image to the `docs/assets/images` directory, then add this markdown to the file in which you want the image to appear:
```
![scan-anatomy](/assets/images/scan-anatomy.png){:height="440px" width="440px"}
```

Includes:

Add a markdown file of your logically-named include content to the `docs/_includes` directory, then add this markdown to the file in which you want the content to appear:
```
{% include run-a-scan.md %}
```

Relative links:
```
[warehouse yaml]({% link soda-sql/warehouse.md %})

[airflow_bash.py](/../examples/airflow_bash.py)
```

Link to an anchor on a different page:

```
[warehouse yaml]({% link soda-sql/warehouse.md %}#to-anchor)
```

Link to section on same page:

```
[example](#example-tests-using-a-column-metric)
```

External link:

```
<a href="https://en.wikipedia.org" target="_blank">Wikipedia</a>
```

Comment out:

```
<!-- This content does not display on the web page. -->
```

Show code:
To keep the numbered list intact, apply endraw to the end of the line of preceding text; do not prepend with a line break.
```
{% raw %}
{% endraw %}
```

Add Last modified date:

```
{% last_modified_at %}
```

Add collapse-expand toggle:

```
<details>
    <summary>Click to expand</summary>
    Long content here
    and here
</details>
```

Add mailto link:
```
<a href="mailto:support@soda.io">Soda Support</a>
```

Add a table:
```
| Header - Left-aligned content | Header - Center-aligned content | Header - Right aligned content |
|---------------------| :--------------------:|---------------------:|
| Content | Content | Content | Content |
```

## Redirect site visitors

The `jekyll-redirect-from` plugin enables authors to redirect users if a page is moved. 

See documentation: https://github.com/jekyll/jekyll-redirect-from

To apply a redirect, navigate to the redirect destination file, then add the following to the file metadata at the top:

`redirect_from: /pageyouwanttoredirect/`

OR

```
redirect_from:
  - /pageyouwantoredirect/
  - /anotherpagetoredirect/
```

## Troubleshoot the Search tool

docs.soda.io uses the Just The Docs for the theme which, in turn, uses lunrjs for the Search tool. Per lunrjs's documentation, “the more a search term occurs in a single document, the more that term will increase that document’s score, but the more a search term occurs in the overall collection of documents, the less that term will increase a document’s score.” There is no built-in functionality in the theme to adjust the document’s scoring relative to search terms.

Work-around: artificially add a string/search term to to a document to boost the document's search score and make it appear in the auto-complete search results.

Also, lunrjs does not take into account ocurrences of terms that appear in \_includes. For the Search tool to "find" a term, the term itself must occur in the content of a served markdown file. For example, though the term regex appeared multiple times in two \_includes files, the Search tool registered zero occurrences of the term in the docs. Adding the term to the content of the metrics.md and sql_metrics.md files yielded expected search results.

## Jekyll SEO Tag Plugin

For static web builders like Jekyll, the one that we use, there is a plugin that automatically optimizes for SEO called [Jekyll SEO Tag](https://github.com/jekyll/jekyll-seo-tag). It does stuff like "automatically add the appropriate search engine metadata to each page, including the page title, description, canonical URL, next and previous URLs for posts, and JSON-LD site and post metadata to help your site get properly indexed by search engines."  (See [this blogpost](https://cloudcannon.com/blog/showcase-jekyll-seo-plugin/) that illustrates the stuff that the Jekyll SEO Tag plugin does.)

That plugin has not been explicitly installed on our version of Jekyll. However, if you add the tag {% seo %} to your head.html file, Jekyll automatically starts applying Jekyll SEO Tag functionality. When I tested it by removing that tag, all the SEO content between the <!-- Begin Jekyll SEO tag v2.7.1 --> and <!-- End Jekyll SEO tag --> disappeared.  