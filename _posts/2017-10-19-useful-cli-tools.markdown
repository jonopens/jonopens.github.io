---
layout: post
title:  Useful Unix CLI Applications with Examples
h1: What Are Some Useful Unix CLI Tools on Mac OS X?
description: A summary of common command line tools that can make life easier and accomplish common tasks. Work smart, not hard!
date_string:   "October 19, 2017"
categories: cli terminal macosx
permalink: /blog/useful-cli-applications.html
excerpt: "A brief primer on some common Unix command line tools. Super beginner level."
---
Knowing the right tools for a job is an important part of performing any task, but it can be critical to performing a task efficiently in programming and data manipulation.

<iframe class="center-block" src="https://giphy.com/embed/lJDLy8JXZwkBa" width="480" height="397" frameborder="0" kwframeid="1"></iframe>

This article will seek to pull together some common and useful command line tools that you may or may not know about, specifically on Mac OS X. For the record, as of this writing, I am running Mac OS X Sierra on a MacBook Air. Onward!

## man - read Unix program documentation

Perhaps the easiest way to learn more about command line tools, utilities and applications is to read the documentation, and the man utility exposes documentation of command line tools to us there in the command. Perhaps the silliest use of this tool is in the line...

{% highlight bash %}
$ man man
{% endhighlight %}

...which outputs the man page for man itself. Wild stuff.

## wc - count words, lines or characters in file(s)

Useful as a counting tool, `wc` (word count) will take the files you list to it and provide a count. In the below case, we're using it to count the lines in our Gemfile and Gemfile.lock files in a Rails project. Two other common flags to supply to `wc` are `-w` for counting words and `-c` for counting characters.

{% highlight bash %}
$ wc -l Gemfile Gemfile.lock
    56 Gemfile
   232 Gemfile.lock
   288 total

{% endhighlight %}

## cut - extract parts of a file

The cut tool is useful when you want to grab a specific part of a file that has a predictable structure. A common application might be pulling the usernames of every user in the /etc/passwd file on your machine (it's unintelligible to me, however).

In the below code, we indicate the delimiter we want to use to separate a line of text into fields with `-d`. Then we select the fields we want with the numerical argument after `-f`. Finally, we indicate the file from which we want to extract data.

{% highlight bash %}
$ cut -d ':' -f 1 /etc/passwd
{% endhighlight %}

## grep - find matching strings in files

There are a lot of different flavors of grep out there, but all of them are extremely useful. Of particular use is the fact that grep can match the contents of as many files as you like against regular expressions (fgrep doesn't support regex, though).

A common use case for grep in my past job as an SEO was to collect links from HTML files (after cURL'ing them) or to extract data from XML sitemaps. The below code only returns the matching portion of the string with the `-o` flag, adds regular expression functionality (so I can use '.+?') with the `-E` flag, and matches the minimum characters to the possible to the pattern with the ? character (called a non-greedy match).

{% highlight bash %}
$ grep -oE 'http.+?<\/loc>'
{% endhighlight %}

## sed - edit streaming data

The heading here makes it sound like I understand this much better than I do, but it's called sed (Stream EDitor) for a reason. I use sed for string substitutions in large files as it's extremely fast, even with very large datasets. It also leverages regular expression, which makes it very powerful for complex pattern matching.

NOTE: the below code is a terrible idea but won't have any impact unless we were to edit in place with the `-i` flag.

{% highlight bash %}
$ sed 's:>=:<=:' Gemfile
{% endhighlight %}

## curl - transfer data from a URL

I used to use curl primarily to test or download resources from the command line. It's syntax can be a little weird, so I'd suggest using wget if you have the option (and you can using Homebrew).

curl [website url] will spit out the HTML to terminal, and `curl -v [website url]` will also give you verbose output with headers. Things get a little weird if you want to download and rename a file.

{% highlight bash %}
$ curl https://www.google.com -o googs.html
{% endhighlight %}

## tee - split program output to a file and another app

If you're familiar with piping output to other shell applications, tee can be very useful. It effectively duplicates the stream by splitting it to a file output and also being 'pipeable' again to a new application. I'm not as familiar with tee but have read how useful it can be often.

{% highlight bash %}
$ ls | tee lsoutput.txt | grep 'pants_are_evil.rb'
{% endhighlight %}

## cat - concatenate file contents and print to terminal

cat is short for concatenate, but people often use it just to dump a text file's contents to the terminal. However, it can be even more valuable when you want to pull multiple files together before dumping to terminal. That's about it, from what I know.

{% highlight bash %}
$ cat Gemfile Gemfile.lock
{% endhighlight %}

## comm - compare two sorted files

One of my favorite tools that I don't often get to use, comm has a few different ways of comparing the contents of two sorted files. That's an important part. They have to be sorted in some way, so that comm can find the lines that are different from one another.

In order to make best use of comm, we need to remember that it outputs three "columns" of data - 1, 2, 3. Clever naming. Anyway, "1" contains lines unique to the first file, "2" contains lines unique to the second file, and "3" contains lines common to both files. So how does comm want us to use that knowledge? By selectively suppressing all, some or none of those columns.

The below code would only show lines common to file1.txt and file2.txt

{% highlight bash %}
$ comm -12 file1.txt file2.txt
{% endhighlight %}

## kill - manually stop a process

Useful for ending hung up process that won't respond to other methods. Use the top command to get a process id (PID) number and then let 'er rip. The below would kill the app associated with process id 123. If you need a more "nuclear option" for a stuck application or process, you can kill all processes associated with a user with the associated pkill tool.

{% highlight bash %}
$ kill 123
pkill -u jonopenshaw
{% endhighlight %}

## time - measure time spent performing CLI action(s)

I put this one here because it could be useful for measuring optimizations in code (though I haven't read up on how accurate time is). When added before another CLI command, it will measure the time it takes to perform the operations, and return three values in terminal: real time, user time, and sys time.

## I barely touched the surface of Unix applications

Even though I covered a few different useful CLI tools, this isn't the half of what's available and possible. I had more I wanted to write about! There's even an entire programming language, awk, built into most Unix systems just for processing text files. Madness.

<iframe class="center-block" src="https://giphy.com/embed/xT5LMJCSCZybwZCaXK" width="480" height="362" frameborder="0" allowfullscreen="" kwframeid="2"></iframe>

Anyway, the point is, there's a lot of love in the terminal and shell of your choice. Enjoy and explore!
