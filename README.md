FormGoodnessBundle
==================

### 1. Displaying errors in tabbed forms
 - including the ```form_errors.js``` file in your template 
 
### 2.  Map errors to form from a json response
 - include ```jquery.form.js``` (this also works with tabbed forms as described above) 
 - Submit action response should return a Json response formatted like 
    
        return new JsonResponse(
            ['error' => FormUtils::formErrorsArray($form)]
        );

    The FormUtils class loops the form and all of his children to map the errors.
    
    To map the errors client side all you have to do is: 
        //Success handler of ajax call
        success: function(data) {
            if (data.hasOwnProperty('error')) {
                form.mapErrors(data.error);
            } else {
                //Do what you would normally do on success 
            }
        },

### 3. Triggering dynamic form components (chosens, datepickers, timepickers, ...)
 - Include ```dynamic_form_components.js```
 - trigger this on a form like: 
        $([form-selector]).triggerDynamicFormElements();

### 4. Create forms in a modal from a trigger
 - This creates a modal triggered by this element filled with the html of the data_url (default href attr of element)
 - on posting the form errors get mapped or modal gets hidden (and destroyed) on success
 
       $('.schedule-job-btn').modalForm({
            title: 'Schedule job'
        }); 
    - possible options are 
        - title: the modal title
        - data_url: the url for getting the form html (default the trigger href attribute)
        - request_data: extra data you want to send along with the request on triggering the modalform, should be a callback function that returns valid request data (p.e. JSON)
        - submit_selector: the selector that triggers the form submission (default btn with type submit inside the returned html )
        - modal_id: id used for rendered modal
    

##### 4.1 binding to modal form events 
 - following events are provided : 
    - modalform.post_error
    - modalform.post_success
    - modalform.after_modal_hide
    - modalform.modal_html_success
    - modalform.before_modal_show
    - modalform.after_modal_show
 
 - bind to a modalform event like 
 
        $([trigger selector]).modalForm({
            title: 'Formgoodness is awesome!!!'
        }).bind('modalform.post_success', function(){
            console.log('ow yeah !!!');
        });
