 #!/bin/sh
awk -F: '
BEGIN { print "<div class=\"faq-section\">"}
/^ +- question|^ +answer/ {  
    #print "<div class=\"faq-item\">"
    if(NR % 2 == 1) {
        print "<h3 class=\"faq-title\">"$2"</h3>"
    } 
    if(NR % 2 == 0) {
        print "<div>"$2"</div>"
        print "<hr class=\"faq-sep\">"
    } 
    #print "</div>"

}
END { print "</div>" }
'
