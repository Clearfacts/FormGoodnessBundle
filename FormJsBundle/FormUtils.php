<?php

namespace Tactics\FormJsBundle;

use Symfony\Component\Form\FormInterface;

class FormUtils
{
    /**
     * @todo provide testcase.
     * Creates an array of form errors.
     */
    public static function formErrorsArray(FormInterface $form)
    {
        $errors = array();

        $formErrors = array();
        foreach($form->getErrors() as $formError) {
            $formErrors[] = $formError->getMessage();
        }

        if(count($formErrors)) {
            $errors["{$form->getName()}"] = $formErrors;
        }


        foreach ($form->all() as $childName => $child) {
            if (! $child->getErrors()->count())   {
                continue;
            }

            $childErrors = array();
            foreach ($child->getErrors() as $formError) {
                $childErrors[] = $formError->getMessage();
            }

            $errors["{$form->getName()}_{$childName}"] = $childErrors;
        }

        return $errors;
    }
}
