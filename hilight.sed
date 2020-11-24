s/([^\/])>/\1 >/g;
s/<\/([^>]+)>/#span class="syntax-html-bracket">\&lt;\/@span>#span class="syntax-html-tag">\1@span>#span class="syntax-html-bracket">\&gt;@span>/g;
s/(<)([^ \/]+) *(( +[^=>]+="[^"]*")*) *(\/?)>/#span class="syntax-html-bracket">\&lt;@span>#span class="syntax-html-tag">\2@span>ATTRS=[\3]#span class="syntax-html-bracket">\5\&gt;@span>/g;
:attrs
s/(ATTRS=\[) ([^=]+)="([^"]*)"/ #span class="syntax-html-attribute-key">\2@span>#span class="syntax-html-attribute-equals">=@span>#span class="syntax-html-quotation">"@span>#span class="syntax-html-attribute-value">\3@span>#span class="syntax-html-quotation">"@span>\1/g;
t attrs
s/ATTRS=\[\]//g;
s/#span/<span/g;
s/ ?@span/<\/span/g;
