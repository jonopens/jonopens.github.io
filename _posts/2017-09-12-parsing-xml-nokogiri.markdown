---
layout: post
title: Parsing XML Sitemaps with Nokogiri & Open-URI in Ruby
h1: Parsing XML Sitemaps in Ruby with Nokogiri
description: Before digging into a larger project of transitioning an old BASH script of mine to Ruby, I wanted to get familiar with Nokogiri
date_string: "September 9, 2017"
categories: ruby xml
permalink: /blog/parsing-xml-sitemaps-with-nokogiri.html
excerpt: "A short primer on how to consume XML sitemaps in Ruby using the Nokogiri gem and get at the good stuff."
---

As an SEO of over 10 years, I'm always looking for shortcuts to getting data faster about the website I'm working on. XML sitemaps are one of the easiest ways to collect all the relevant URLs about a site you could want, so it can be a good use of time to explore and extract data from them. I've written scripts to collect URLs before but not in Ruby.

<img src="https://i.giphy.com/media/FFUOouOEv3rKo/giphy.webp" alt="we fear change" width="600">

And since we need to be challenging ourselves as often as possible, I decided to go to familiar territory (comforting) but with unfamiliar tools (challenging): Nokogiri and Ruby (plus Open-URI).

## What is an XML Sitemap?

If you're not familiar, XML sitemaps are files that we use to send URLs to Google in bulk. We point Google to the files using a service called Google Search Console, and Google analyzes the XML files, hopefully crawling the content at the URLs you provided. It's an important way to have Google discover new content you've posted.

There are some limitations to XML sitemaps, too. Each file is only allowed to contain a maximum of 50,000 URLs (Google ignores the rest), so sometimes you'll need a sitemap index - a sitemap of sitemaps. A sitemap index is what we are starting with here, and the goal is to extract a list of all the URLs of the child sitemaps. In this case, there was an additional hurdle in that those files were gzipped and would have to be unzipped before the extraction of URLs could start.

## Reading Documentation Can Be a Shock

<img src="https://media3.giphy.com/media/Ki9ZNTNS7aC9q/giphy.gif" alt="Nokogiri has a fearful number of object types" width="500">

I have to say here that I spent a lot more time than I thought I would poring over documentation, going back to terminal, jumping back to documentation, ad infinitum, ad nauseam. I didn't understand the object relationships between Nokogiri's object classes, so I Google'd. A lot. I also spent a bunch of time just trying things out in IRB sessions to see what would happen. I didn't know what else I should do. It seems to me this is something to improve upon to reduce the time it takes to implement code for an unfamiliar tool.

## Getting Started with Nokogiri

Note: Before anything, if you aren't sure if Nokogiri is installed on your machine, run `gem install nokogiri` from terminal. For whatever reason, it seems to take a long-ish time to install, so here's your heads up.

For starters, I checked out the tutorials on the Nokogiri site and found a way to get content from a web URL and create a Nokogiri::XML::Document object. It seemed pretty straightforward.

{% highlight ruby %}

require 'open-uri'
require 'nokogiri'

opened_sitemap = open("https://www.[--redacted--].com/sitemaps/")
xml_document = Nokogiri(opened_sitemap)

#=> this would return a huge Nokogiri object to STDOUT

{% endhighlight %}

The resulting object, however, was gigantic and made it super hard to know how to deal with it. To be honest, I wasn't sure what to do, so I went for a run and came back to it. When I got back I decided to look at the `Nokogiri::XML::Document` (how do you even say that?) object to look for clues and noticed a few other classes:

- `Nokogiri::XML::Element`
- `Nokogiri::XML::Text`
- `Nokogiri::XML::Namespace`

That was where I started looking back at the documentation, hoping to get more info.

I decided to look through what I got back if I ran `#methods` on the object in IRB. The return was a massive list but I found a few candidates to test out like `#text`, `#elements`, `#children`, `#inner_html`, and `#css`. What I wanted to find was a way to get at the loc elements' text which contained the URLs for the child sitemaps.

After Googling some more and reading more documentation, the `#css` method was the method that really cracked it open. It requires an argument - a css selector - that matches the node/s I wanted to find ("loc"). The return was an object called a NodeSet. Interesting.

{% highlight ruby %}

xml_document.css('loc').class
#=> Nokogiri::XML::NodeSet
{% endhighlight %}

With a name that has "Set" in it, that sounds like something we can iterate over, right? And, sure enough, we can. Combining that with the `#inner_html` or the `#text` we saw in the instance methods earlier, we can return an array of the URLs we want!

{% highlight ruby %}

# Picking up where we left off, the variable xml_document is pointing to a Nokogiri object

child_sitemaps = xml_document.css('loc').map { |node| node.text }
#=> huge collection of child sitemap URLs

child_sitemaps[0..9]
#=> first 10 items in the resultant collection

{% endhighlight %}

It turns out that both those methods return the same thing because there is no other content besides text within the loc element. I imagine their intended purposes are different, however.

It would have been great to go further with this example, but I've had a persistent error with a library called "Zlib" that requires a version of Ruby that seems impossible. I'll continue this investigation further after I resolve that issue. Cheers!

![Patrick Stewart raises his glass to you](https://i.giphy.com/media/3o6ZsUJ44ffpnAW7Dy/source.gif "we have sitemap URLs!")
